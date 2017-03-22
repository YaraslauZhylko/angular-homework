import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { BooksModule } from './books';
import { UsersModule } from './users';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,  // Not used yet
    BooksModule,
    UsersModule  // Just for demonstration. Not used yet.
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
