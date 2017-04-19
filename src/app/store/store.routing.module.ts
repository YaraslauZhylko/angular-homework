import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, CanDeactivateGuard } from './../guards';

import { BooksListComponent, BookDetailsComponent, BookResolveGuard } from './../books';
import { CartComponent, CheckoutComponent, CheckoutResolveGuard } from './../orders';


const StoreRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BooksListComponent
          },
          {
            path: ':id',
            component: BookDetailsComponent,
            resolve: {
              book: BookResolveGuard
            }
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartComponent
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
            canActivate: [AuthGuard],
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              orderData: CheckoutResolveGuard
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(StoreRoutes)
  ]
})
export class StoreRoutingModule { }
