import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BooksService } from './../../../books';
import { User, } from './../../../users';
import { OrderData, OrdersService } from './../..';
import { DialogueService } from './../../../services';


@Component({
  templateUrl: './order-details.component.html',
  styleUrls: ['./../../../shared/css/shared.css'],
})
export class OrderDetailsComponent implements OnInit {

  private orderData: OrderData = new OrderData();
  private missingClient: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private ordersService: OrdersService,
    private dialogueService: DialogueService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { orderData: OrderData }) => {
      if (data.orderData) this.orderData = data.orderData;
    });
    // Get client
    if (!this.orderData.client) {
      this.orderData.client = new User(null, "Unknown", "user");
      this.missingClient = true;
    }
  }

  completeOrder() {
    this.dialogueService.confirm('Complete order?')
      .then(doComplete => {
        if (doComplete) {
          this.orderData.order.isCompleted = true;
          this.ordersService.save(this.orderData.order)
              .then(() => this.goBack())
              .catch(error => alert(error));
        }
      });
  }

  deleteOrder() {
    this.dialogueService.confirm('Delete order?')
      .then(doDelete => {
        if (doDelete) {
          this.ordersService.delete(this.orderData.order.id)
            .then(() => {
              // Return reserved books to store
              this.orderData.order.items.forEach(item => {
                this.booksService.get(item.bookId)
                  .then(book => {
                    book.count += item.count;
                    this.booksService.save(book);
                  })
                  .catch(error => {"Just swallow book error and continue!"});
              });
            })
            .then(() => this.goBack())
            .catch(error => alert(error));
        }
      });
  }

  back() {
    this.goBack();
  }

  private goBack = ()  => this.router.navigate(['./'], {relativeTo: this.route.parent});
}
