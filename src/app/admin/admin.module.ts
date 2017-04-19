import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksModule } from './../books';
import { UsersModule } from './../users';
import { OrdersModule } from './../orders';

import { AdminRoutingModule, AdminComponent, IsAdminFeatureAreaResolveGuard } from '.';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BooksModule,
    UsersModule,
    OrdersModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent
  ],
  providers: [
    IsAdminFeatureAreaResolveGuard
  ]
})
export class AdminModule {}
