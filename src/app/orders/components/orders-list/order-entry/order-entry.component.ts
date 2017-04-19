import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from './../../../../books';
import { User } from './../../../../users';
import { Order } from './../../..';

@Component({
  selector: '[app-order-entry]',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./../../../../shared/css/shared.css']
})
export class OrderEntryComponent implements OnInit{

  @Input() order: Order;
  @Input() clients: Array<User>;
  @Input() books: Array<Book>;

  private client: User;
  private totalCount: number = 0;
  private totalPrice: number = 0;
  private missingClient: boolean = false;
  private missingItems: boolean = false;

  @HostBinding('style.cursor') cursor = 'pointer';
  @HostBinding('class.hover') hoverDecoration: boolean;
  @HostBinding('class.critical') criticalDecoration: boolean = false;

  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.hoverDecoration = true;
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.hoverDecoration = false;
  }

  @HostListener('click', ['$event']) onClick(event) {
    this.router.navigate([this.order.id], {relativeTo: this.route});
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get client
    this.client = this.clients.find(client => client.id === this.order.clientId);
    if (!this.client) {
      this.client = new User(null, "[Unknown", "user]")
      this.missingClient = true;
    }
    // Get books
    this.order.items.map(item => {
      let book = this.books.find(book => book.id === item.bookId);
      if (book) {
        this.totalCount += item.count;
        this.totalPrice += book.price * item.count;
      } else {
        this.missingItems = true;
      }
    });
    this.criticalDecoration = this.missingClient || this.missingItems;
  }
}
