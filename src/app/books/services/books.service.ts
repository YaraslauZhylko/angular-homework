import { Injectable, Inject, Optional } from '@angular/core';

import { Book } from './../';
import { UNIQUE_ID_8, StorageService } from './../../shared';

@Injectable()
export class BooksService {

  constructor(
    // Comment out UNIQUE_ID_8 declaration in SharedModule's 'providers' to see this service use INTEGER IDs
    @Inject(UNIQUE_ID_8) @Optional() private uniqueId: any,
    // Comment out StorageService declaration in SharedModule's 'providers' to see this service use in-memory storage
    @Optional() private storage: StorageService
  ) {
    this.preSeedIfRequired();
    this.setInitialSequentialIdIfRequired();
  }

  // ID-related methods:

  private nextSequentialId: number = 1;

  private setInitialSequentialIdIfRequired(): void {
    if (this.storage && !this.uniqueId) {
      for (let book of this.getAll()) {
        let integerId = parseInt(book.id);
        if (!isNaN(integerId)) {
          this.nextSequentialId = Math.max(this.nextSequentialId, integerId + 1);
        }
      }
    }
  }

  private sequentialId(): string {
    return String(this.nextSequentialId++);
  }

  private getId(): string {
    return this.uniqueId ? this.uniqueId() : this.sequentialId();
  }

  // Storage-related methods:

  private fallbackStorage: Array<Book> = [];

  private preSeedIfRequired(): void {

    let alreadyPopulated =
      this.storage
        ? this.storage.getAll().length > 0
        : this.fallbackStorage.length > 0;

    if (!alreadyPopulated) {
      if (this.storage) alert("Initially pre-seeding localStorage with data...");
      this.save(new Book(null, "Жалейка", "Янка Купала", [4, 3, 4, 5]));
      this.save(new Book(null, "Новая зямля", "Якуб Колас"));
      this.save(new Book(null, "Вянок", "Максім Багдановіч", [4, 5, 4]));
      this.save(new Book(null, "Ладдзя роспачы", "Уладзімір Караткевіч", [5, 4, 5]));
      this.save(new Book(null, "Неруш", "Рыгор Барадулін"));
      this.save(new Book(null, "Знак Бяды", "Васіль Быкаў", [5, 5]));
      this.save(new Book(null, "Першае чытаньне для дзетак беларусаў", "Цётка", [4, 3, 4, 5]));
      this.save(new Book(null, "Песьня пра зубра", "Мікола Гусоўскі", [4, 3, 5, 5]));
      this.save(new Book(null, "Пінская шляхта", "Вінцэнт Дунін-Марцінкевіч"));
      this.save(new Book(null, "Палескія рабінзоны", "Янка Маўр", [4, 5]));
    }
  }

  // PUBLIC METHODS:

  get(id: string): Book {
    if (this.storage) {
      alert('STORAGE GET');
      return Book.fromJSON(this.storage.get(id));
    } else {
      alert('FALLBACK GET');
      for (let book of this.fallbackStorage) {
        if (book.id === id) return book;
      }
    }
  }

  getAll(): Array<Book> {
    if (this.storage) {
      // alert('STORAGE GETALL');  // DEBUG
      let bookArray = [];
      for (var bookData of this.storage.getAll()) {
        let book = Book.fromJSON(bookData);
        if (book) bookArray.push(book);
      }
      return bookArray;
    } else {
      // alert('FALLBACK GETALL');  // DEBUG
      return this.fallbackStorage;
    }
  }

  rate(book: Book, rate: number): void {
    book.ratings.push(rate);
    this.save(book);
  }

  save(book: Book): string {
    if (this.storage) {
      // alert('STORAGE SAVE');  // DEBUG
      if (book.id) {
        if (!this.storage.get(book.id)) {
          return "This book has already been deleted. Please cancel your edit."
        }
      } else {
        book.id = this.getId();
      }
      this.storage.set(book.id, book);

    } else {
      // alert('FALLBACK SAVE');  // DEBUG
      if (book.id) {
        for (let idx = 0; idx < this.fallbackStorage.length; idx++) {
          if (this.fallbackStorage[idx].id === book.id) {
            this.fallbackStorage[idx] = book;
            return;
          }
        }
        return "This book has already been deleted. Please cancel your edit."
      } else {
        book.id = this.getId();
        this.fallbackStorage.push(book);
      }

    }
  }

  delete(book: Book): void {
    if (this.storage) {
      // alert('STORAGE DELETE');  // DEBUG
      this.storage.remove(book.id);
    } else {
      // alert('FALLBACK DELETE');  // DEBUG
      let bookIndex = this.fallbackStorage.indexOf(book);
      if (bookIndex >= 0) this.fallbackStorage.splice(bookIndex, 1);
    }
  }

}
