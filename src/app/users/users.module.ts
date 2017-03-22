import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from './models';
import { UsersService } from './services';

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
