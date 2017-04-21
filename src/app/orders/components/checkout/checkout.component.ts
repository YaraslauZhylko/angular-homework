import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Order, OrdersService, CartService } from './../..';
import { User } from './../../../users';
import { BooksService } from './../../../books';
import { AuthService, DialogueService }  from './../../../services';


@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private subs: Array<Subscription> = [];

  private order: Order;
  private client: User;

  saveError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private cartService: CartService,
    private authService: AuthService,
    private booksService: BooksService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    // Clean items with 0 count from the cart.
    this.cartService.clean();
    // Get cart items
    let orderItems = this.cartService.getItems();
    if (!orderItems.length) {
      alert("No items in the cart.");
      this.goBack();
    }
    // Get logged-in user
    this.client = this.authService.user;
    // Create new order object
    this.order = new Order(null, orderItems, this.client.id, "" /*empty address*/);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.order.id || !this.order.address) return true;
    return this.dialogueService.confirm('Discard changes?');
  }

  createOrder() {
    this.order.address = this.order.address.trim();
    if (!this.order.address) {
      this.saveError = "Please fill in shipment address."
    } else {
      this.subs.push(
        this.ordersService.save(this.order)
          .subscribe(
            () => {
              // Reserve books for submitted order
              this.order.items.forEach(item => {
                this.booksService.get(item.bookId)
                  .then(book => {
                    book.count -= item.count;
                    this.booksService.save(book);
                  })
                  .catch(error => alert(error));
              });
              // Empty cart
              this.cartService.empty();
              // Go back to the cart identifying current order data
              this.goBack({id: this.order.id});
            },
            error => alert(error)));
    }
  }

  cancel() {
    this.goBack();
  }

  private goBack = (extras?: Object)  => this.router.navigate(['./', extras || {}], {relativeTo: this.route.parent});
}
