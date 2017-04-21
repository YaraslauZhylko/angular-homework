import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  User,
  UsersService,
  UserResolveGuard,
  UsersListComponent,
  UserEntryComponent,
  UserEditComponent,
  FullNamePipe
} from '.';

import { CanDeactivateGuard } from './../guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    UsersListComponent,
    UserEntryComponent,
    UserEditComponent,
    FullNamePipe
  ],
  providers: [
    UsersService,
    UserResolveGuard,
    CanDeactivateGuard
  ],
  exports: [
    FullNamePipe
  ]
})
export class UsersModule { }
