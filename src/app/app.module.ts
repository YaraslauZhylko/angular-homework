import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule, API_URL } from './shared';
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
    RouterModule,
    HttpModule,
    SharedModule,
    UsersModule,
    OrdersModule,
    StoreModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: API_URL, useValue: 'http://localhost:3000'},
    {provide: LOCALE_ID, useValue: 'by-BY'},
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
