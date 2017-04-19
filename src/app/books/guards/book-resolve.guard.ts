import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Book, BooksService } from './..';

@Injectable()
export class BookResolveGuard implements Resolve<Book> {

  constructor(
    private router: Router,
    private booksService: BooksService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Book> {
    let id = route.params['id'];
    return this.booksService.get(id)
      .catch(error => {
        alert(error);
        let url = ['books'];
        if (route.url[1] && route.url[1].toString() === 'edit')
          url.splice(0, 0, 'admin');
        this.router.navigate(url);
      });
  }
}
