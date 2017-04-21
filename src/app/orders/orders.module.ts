import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BooksModule } from './../books';
import { UsersModule } from './../users';

import {
  OrdersService,
  CartService,
  OrderItemEntryComponent,
  OrderItemsListComponent,
  OrderDetailsComponent,
  OrderEntryComponent,
  OrdersListComponent,
  CartComponent,
  CheckoutComponent
} from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BooksModule,
    UsersModule
  ],
  declarations: [
    OrderItemEntryComponent,
    OrderItemsListComponent,
    OrderDetailsComponent,
    OrderEntryComponent,
    OrdersListComponent,
    CartComponent,
    CheckoutComponent
  ],
  providers: [
    OrdersService,
    CartService
  ]
})
export class OrdersModule { }
