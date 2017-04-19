import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAuthGuard, CanDeactivateGuard } from './../guards';
import { AdminComponent, IsAdminFeatureAreaResolveGuard } from '.';
import { BooksListComponent, BookEditComponent, BookResolveGuard } from './../books';
import { UsersListComponent, UserEditComponent, UserResolveGuard } from './../users';
import { OrdersListComponent, OrderDetailsComponent, OrdersResolveGuard, OrderResolveGuard } from './../orders';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      isAdminFeatureArea: IsAdminFeatureAreaResolveGuard
    },
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrdersListComponent,
            resolve: {
              ordersData: OrdersResolveGuard
            }
          },
          {
            path: ':id',
            component: OrderDetailsComponent,
            resolve: {
              orderData: OrderResolveGuard
            }
          }
        ]
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BooksListComponent
          },
          {
            path: 'add',
            component: BookEditComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: ':id/edit',
            component: BookEditComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              book: BookResolveGuard
            }
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersListComponent
          },
          {
            path: 'add',
            component: UserEditComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: ':id/edit',
            component: UserEditComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              user: UserResolveGuard
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminRoutingModule { }
