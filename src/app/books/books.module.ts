import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './../guards';
import { BookResolveGuard }    from '.';

import {
  Book,
  BooksService,
  BooksListComponent,
  BookEntryComponent,
  BookDetailsComponent,
  BookEditComponent,
  AvailableBooksPipe,
  AverageRatingPipe,
  TitlePipe
} from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    BooksListComponent,
    BookEntryComponent,
    BookDetailsComponent,
    BookEditComponent,
    AvailableBooksPipe,
    AverageRatingPipe,
    TitlePipe
  ],
  providers: [
    BooksService,
    CanDeactivateGuard,
    BookResolveGuard,
  ],
  exports: [
    TitlePipe
  ]
})
export class BooksModule { }
