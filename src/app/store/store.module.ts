import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksModule } from './../books';
import { OrdersModule } from './../orders';

import { StoreRoutingModule } from '.';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BooksModule,
    OrdersModule,
    StoreRoutingModule
  ]
})
export class StoreModule {}
