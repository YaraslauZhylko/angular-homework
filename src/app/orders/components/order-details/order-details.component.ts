import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Order, OrdersService } from './../..';
import { User, UsersService } from './../../../users';
import { Book, BooksService } from './../../../books';
import { DialogueService } from './../../../services';


@Component({
  templateUrl: './order-details.component.html',
  styleUrls: ['./../../../shared/css/shared.css'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  private subs: Array<Subscription> = [];

  private order: Order;
  private client: User;
  private books: Array<Book>;
  private missingClient: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private booksService: BooksService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.params.subscribe(params => {
        let id: string = params['id'];
        if (id) {
          this.subs.push(
            this.ordersService.get(id)
              .subscribe(
                 order => {
                   this.usersService.get(order.clientId)
                     .then(user => this.client = user)
                     .catch(error => this.client = new User(null, "Unknown", "client"))
                     .then(() => {
                       let bookIds = order.items.map(item => item.bookId);
                       this.booksService.getAll(bookIds)
                         .then(books => this.books = books)
                         .catch(error => alert(error))
                         .then(() => this.order = order);
                     });
                 },
                 error => {
                   alert(error);
                   this.goBack();
                 }));
        }
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  completeOrder() {
    this.dialogueService.confirm('Complete order?')
      .then(doComplete => {
        if (doComplete) {
          this.order.isCompleted = true;
          this.subs.push(
            this.ordersService.save(this.order)
              .subscribe(
                this.goBack,
                error => alert(error)));
        }
      });
  }

  deleteOrder() {
    this.dialogueService.confirm('Delete order?')
      .then(doDelete => {
        if (doDelete) {
          this.subs.push(
            this.ordersService.delete(this.order.id)
              .subscribe(
                () => {
                  // Return reserved books to store
                  this.order.items.forEach(item => {
                    this.booksService.get(item.bookId)
                      .then(book => {
                        book.count += item.count;
                        this.booksService.save(book);
                      });
                  });
                  this.goBack();
                },
                error => alert(error)));
          }
        });
  }

  back() {
    this.goBack();
  }

  private goBack = ()  => this.router.navigate(['./'], {relativeTo: this.route.parent});
}
