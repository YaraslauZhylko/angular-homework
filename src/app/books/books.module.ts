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
  BookEditComponent
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
    BookEditComponent
  ],
  providers: [
    BooksService,
    CanDeactivateGuard,
    BookResolveGuard
  ]
})
export class BooksModule { }
