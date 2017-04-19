import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order, OrderItem, OrderData, OrdersService, CartService } from './../..';
import { Book, BooksService } from './../../../books';
import { User } from './../../../users';
import { DialogueService }  from './../../../services';


@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./../../../shared/css/shared.css']
})
export class CheckoutComponent implements OnInit {

  private orderData: OrderData;

  saveError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private booksService: BooksService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { orderData: OrderData }) => {
      if (data.orderData) this.orderData = data.orderData;
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (this.orderData.order.id ||
        !this.orderData.order.address) return true;
    return this.dialogueService.confirm('Discard changes?');
  }

  createOrder() {
    let order = this.orderData.order;
    order.address = order.address.trim();
    if (!order.address) {
      this.saveError = "Please fill in shipment address."
    } else {
      this.ordersService.save(order)
        .then(() => {
          // Reserve books for submitted order
          order.items.forEach(item => {
            this.booksService.get(item.bookId)
              .then(book => {
                book.count -= item.count;
                this.booksService.save(book);
              })
              .catch(error => alert(error));
          });
        })
        .then(() => this.cartService.empty())
        .then(() => {
          let orderExtras = {id: order.id};
          return orderExtras;
        })
        .then(extras => this.goBack(extras))
        .catch(error => alert(error));
    }
  }

  cancel() {
    this.goBack();
  }

  private goBack = (extras?: Object)  => this.router.navigate(['./', extras || {}], {relativeTo: this.route.parent});
}
