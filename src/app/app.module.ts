import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ReorderableListComponent } from './reorderable-list/reorderable-list.component';
import { RandomItemsService } from './random-items.service';

@NgModule({
  declarations: [
    AppComponent,
    ReorderableListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RandomItemsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
