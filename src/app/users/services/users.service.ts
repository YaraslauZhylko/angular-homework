import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL, UNIQUE_ID_8 } from './../../shared';
import { User } from './..';

@Injectable()
export class UsersService {

  private url: string;

  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(UNIQUE_ID_8) private uniqueId: any,
    private http: Http
  ) {
    this.url = `${this.apiUrl}/users`;
  }

  // PUBLIC METHODS:

  getAll(ids?: Array<string>): Promise<Array<User>> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json().map(user => User.fromJSON(user)))
      .then(books => books.filter(user => !ids || ids.indexOf(user.id) >= 0))
      .catch(this.handleError);
  }

  get(id: string): Promise<User> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => User.fromJSON(response.json()))
      .catch(this.handleError);
  }

  save(user: User): Promise<User> {
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${this.url}/${user.id}` : `${this.url}`;
    user.id = user.id ? user.id : this.uniqueId();
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
     });
    const body = JSON.stringify(user);
    return this.http[method](url, body, options)
      .toPromise()
      .then(response => User.fromJSON(response.json()))
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
    return Promise.reject("User(s) not found.");
  }
}
