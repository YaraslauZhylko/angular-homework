import { Pipe, PipeTransform } from '@angular/core';

import { Book } from './..';

@Pipe({
  name: 'averageRating',
  pure: false
})
export class AverageRatingPipe implements PipeTransform {

  transform(book: Book): number|string {
    if (!book.ratings || !book.ratings.length) return 'n/a';
    let sum = book.ratings.reduce((sum, rate) => sum += rate, 0);
    return Math.round((sum / book.ratings.length) * 10) / 10;
  }
}
