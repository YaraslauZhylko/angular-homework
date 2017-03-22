import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Book } from './models';
import { BooksService } from './services';
import { BooksListComponent, BookDetailsComponent, BookEditComponent } from './components';

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
