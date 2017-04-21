import { Injectable, Inject } from '@angular/core';

import { Book } from './..';
import { UNIQUE_ID_8, StorageService } from './../../shared';

@Injectable()
export class BooksService {

  entityType: string = 'book';

  constructor(
    @Inject(UNIQUE_ID_8) private uniqueId: any,
    private storage: StorageService
  ) {
    this.preSeedIfRequired();
  }

  // Storage-related methods:

  private preSeedIfRequired(): void {

    let alreadyPopulated = this.storage.getAll(this.entityType).length > 0;

    if (!alreadyPopulated) {
      if (this.storage) alert("Initially pre-seeding localStorage with book data...");
      this.save(new Book(null, "Жалейка", "Янка Купала", 10, 1, [4, 3, 4, 5]));
      this.save(new Book(null, "Новая зямля", "Якуб Колас", 12, 3));
      this.save(new Book(null, "Вянок", "Максім Багдановіч", 14.2, 5,  [4, 5, 4]));
      this.save(new Book(null, "Ладдзя роспачы", "Уладзімір Караткевіч", 26.4, 2, [5, 4, 5]));
      this.save(new Book(null, "Неруш", "Рыгор Барадулін", 5.56, 2));
      this.save(new Book(null, "Знак Бяды", "Васіль Быкаў", 23.99, 5, [5, 5]));
      this.save(new Book(null, "Першае чытаньне для дзетак беларусаў", "Цётка", 22.1, 4, [4, 3, 4, 5]));
      this.save(new Book(null, "Песьня пра зубра", "Мікола Гусоўскі", 15.6, 2, [4, 3, 5, 5]));
      this.save(new Book(null, "Пінская шляхта", "Вінцэнт Дунін-Марцінкевіч", 23.5, 6));
      this.save(new Book(null, "Палескія рабінзоны", "Янка Маўр", 13, 1, [4, 5]));
    }
  }

  // PUBLIC METHODS:

  getAll(ids?: Array<string>): Promise<Array<Book>> {
    return Promise.resolve(
      this.storage.getAll(this.entityType)
        .filter(book => !ids || ids.indexOf(book.id) >= 0)
        .map(book => Book.fromJSON(book)));
  }

  get(id: string): Promise<Book> {
    let book = this.storage.get(this.entityType, id);
    if (book) return Promise.resolve(Book.fromJSON(book))
    else return Promise.reject("Book not found.");
  }

  rate(id: string, rate: number): Promise<Book> {
    return this.get(id)
      .then(book => {
        book.ratings.push(rate);
        return book;
      })
      .then(book => { this.save(book); return book; })
  }

  unrate(id: string, rate: number): Promise<Book> {
    return this.get(id)
      .then(book => {
        let lastIdx = book.ratings.lastIndexOf(rate);
        if (lastIdx >= 0) book.ratings.splice(lastIdx, 1);
        return book;
      })
      .then(book => { this.save(book); return book; })
  }

  save(book: Book): Promise<any> {

    let saveBook = (book) => Promise.resolve(this.storage.set(this.entityType, book.id, book));
    let bookNotFound = () => Promise.reject("This book has already been deleted.");

    if (book.id) {
      return this.get(book.id)
        .then(() => saveBook(book))
        .catch(() => bookNotFound());
    } else {
      book.id = this.uniqueId();
      return saveBook(book);
    }
  }

  delete(id: string): Promise<any> {
    return Promise.resolve(this.storage.remove(this.entityType, id));
  }
}
