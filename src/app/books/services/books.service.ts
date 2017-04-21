import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL, UNIQUE_ID_8 } from './../../shared';
import { Book } from './..';

@Injectable()
export class BooksService {

  private url: string;

  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(UNIQUE_ID_8) private uniqueId: any,
    private http: Http
  ) {
    this.url = `${this.apiUrl}/books`;
  }

  // PUBLIC METHODS:

  getAll(ids?: Array<string>): Promise<Array<Book>> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().map(book => Book.fromJSON(book)))
      .then(books => books.filter(book => !ids || ids.indexOf(book.id) >= 0))
      .catch(this.handleError);
  }

  get(id: string): Promise<Book> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => Book.fromJSON(response.json()))
      .catch(this.handleError);
  }

  rate(id: string, rate: number): Promise<Book> {
    return this.get(id)
      .then(book => {
        book.ratings.push(rate);
        return book;
      })
      .then(book => this.save(book))
      .catch(this.handleError);
  }

  unrate(id: string, rate: number): Promise<Book> {
    return this.get(id)
      .then(book => {
        let lastIdx = book.ratings.lastIndexOf(rate);
        if (lastIdx >= 0) book.ratings.splice(lastIdx, 1);
        return book;
      })
      .then(book => this.save(book))
      .catch(this.handleError);
  }

  save(book: Book): Promise<Book> {
    const method = book.id ? 'put' : 'post';
    const url = book.id ? `${this.url}/${book.id}` : `${this.url}`;
    book.id = book.id ? book.id : this.uniqueId();
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
     });
    const body = JSON.stringify(book);
    return this.http[method](url, body, options)
      .toPromise()
      .then(response => Book.fromJSON(response.json()))
      .catch(this.handleError);
  }

  delete(id: string): Promise<any> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred:', error);
    return Promise.reject("Book(s) not found.");
  }
}
