import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book, AverageRatingPipe } from './../../..';

@Component({
  selector: '[app-book-entry]',
  templateUrl: './book-entry.component.html',
  styleUrls: [
    './../../../../shared/css/shared.css',
    './book-entry.component.css'
  ],
  providers: [AverageRatingPipe]
})
export class BookEntryComponent implements OnInit {

  @Input() book: Book;
  @Input() modifiedBook: Object;
  @Input() isAdminFeatureArea: Boolean;

  @HostBinding('style.cursor') cursor = 'pointer';
  @HostBinding('class.hover') hoverDecoration: boolean;
  @HostBinding('class.high-rating') highRating: boolean;
  @HostBinding('class.low-rating') lowRating: boolean;

  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.hoverDecoration = true;
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.hoverDecoration = false;
  }

  @HostListener('click', ['$event']) onClick(event) {
    let url = [this.book.id];
    if (this.isAdminFeatureArea) url.push('edit');
    this.router.navigate(url, {relativeTo: this.route});
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private averageRatingPipe: AverageRatingPipe
  ) { }

  ngOnInit() {
    if (!this.isAdminFeatureArea) {
      let avgRating = this.averageRatingPipe.transform(this.book);
      this.highRating = avgRating >= 4.5;
      this.lowRating = avgRating <= 2.5;
    }
  }
}
