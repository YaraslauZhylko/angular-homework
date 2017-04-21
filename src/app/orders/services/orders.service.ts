import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL, UNIQUE_ID_16 } from './../../shared';
import { Order } from './..';

@Injectable()
export class OrdersService {

  private url: string;

  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(UNIQUE_ID_16) private uniqueId: any,
    private http: Http
  ) {
    this.url = `${this.apiUrl}/orders`;
  }

  // PUBLIC METHODS:

  getAll(): Observable<Array<Order>> {
    return this.http.get(this.url)
      .map(response => response.json().map(order => Order.fromJSON(order)))
      .catch(this.handleError);
  }

  get(id: string): Observable<Order> {
    return this.http.get(`${this.url}/${id}`)
      .map(response => Order.fromJSON(response.json()))
      .catch(this.handleError);
  }

  save(order: Order): Observable<Order> {
    const method = order.id ? 'put' : 'post';
    const url = order.id ? `${this.url}/${order.id}` : `${this.url}`;
    order.id = order.id ? order.id : this.uniqueId();
    const options = new RequestOptions({
      headers: new Headers({'Content-Type': 'application/json'})
     });
    const body = JSON.stringify(order);
    return this.http[method](url, body, options)
      .map(response => Order.fromJSON(response.json()))
      .catch(this.handleError);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errorMessage = (error.message)
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.error(errorMessage);
    return Observable.throw("Order(s) not found.");
  }
}
