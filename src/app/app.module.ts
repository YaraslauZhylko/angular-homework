import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared';
import { UsersModule } from './users';

import { AppComponent } from './app.component';
import { AuthService, DialogueService } from './services';
import { AuthGuard, AdminAuthGuard } from './guards';

import { OrdersModule } from './orders';
import { StoreModule } from './store';

import { AppRoutingModule, RouterComponents } from './app.routing.module';



@NgModule({
  declarations: [
    AppComponent,
    RouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,  // Not used yet
    RouterModule,
    SharedModule,
    UsersModule,
    OrdersModule,
    StoreModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    DialogueService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
