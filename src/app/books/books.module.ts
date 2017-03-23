import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Book,
  BooksService,
  BooksListComponent,
  BookDetailsComponent,
  BookEditComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    BooksListComponent,
    BookDetailsComponent,
    BookEditComponent
  ],
  providers: [
    BooksService
  ],
  exports: [
    BooksListComponent
  ]
})
export class BooksModule { }
