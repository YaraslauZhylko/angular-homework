import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User, UsersService } from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UsersService
  ],
  exports: []
})
export class UsersModule { }
