import { Pipe, PipeTransform } from '@angular/core';

import { Book } from './..';

@Pipe({
  name: 'availableBooks'
})
export class AvailableBooksPipe implements PipeTransform {

  transform(books: Array<Book>): Array<Book> {
    return books.filter(book => book.count > 0);
  }
}
