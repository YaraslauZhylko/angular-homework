import { Injectable } from '@angular/core';

import {Book} from './../../models';

@Injectable()
export class BooksService {

  private books: Array<Book> = [
    new Book(1, "Жалейка", "Янка Купала", [4, 3, 4, 5]),
    new Book(2, "Новая зямля", "Якуб Колас"),
    new Book(3, "Вянок", "Максім Багдановіч", [4, 5, 4]),
    new Book(4, "Ладдзя роспачы", "Уладзімір Караткевіч", [5, 4, 5]),
    new Book(5, "Неруш", "Рыгор Барадулін"),
    new Book(6, "Знак Бяды", "Васіль Быкаў", [5, 5]),
    new Book(7, "Першае чытаньне для дзетак беларусаў", "Цётка", [4, 3, 4, 5]),
    new Book(8, "Песьня пра зубра", "Мікола Гусоўскі", [4, 3, 5, 5]),
    new Book(9, "Пінская шляхта", "Вінцэнт Дунін-Марцінкевіч"),
    new Book(10, "Палескія рабінзоны", "Янка Маўр", [4, 5]),
  ];

  private nextBookId: number = 11;

  constructor() { }

  get(id:number): Book {
    for (let book of this.books) {
      if (book.id === id) return book;
    }
  }

  getAll(): Array<Book> {
    return this.books;
  }

  rate(book:Book, rate:number):void {
    book.ratings.push(rate);
  }

  save(book:Book):string {
    if (book.id) {
      // If that's an existing book
      for (let idx:number = 0; idx < this.books.length; idx++) {
        if (this.books[idx].id === book.id) {
          this.books[idx] = book;
          return;
        }
      }
      return "This book has already been deleted. Please cancel your edit."
    } else {
      // If this is a new book
      book.id = this.nextBookId++;
      this.books.push(book);
      return;
    }
  }

  delete(book:Book):void {
    let bookIndex = this.books.indexOf(book);
    if (bookIndex >= 0) this.books.splice(bookIndex, 1);
  }

}
