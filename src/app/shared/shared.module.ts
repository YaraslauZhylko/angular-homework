import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageService, AppData, UniqueID } from './';
import { ClickStylerDirective } from './';

export const APP_DATA = new OpaqueToken('AppData');
export const UNIQUE_ID_8 = new OpaqueToken('UniqueID');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickStylerDirective
  ],
  providers: [
    // Comment out to change behaviour
    { provide: APP_DATA, useValue: AppData},  // See 'app.component.ts' for details
    { provide: UNIQUE_ID_8, useFactory: UniqueID(8) },  // See 'books/services/books.service.ts' for details
    { provide: StorageService, useClass: StorageService }  // See 'books/services/books.service.ts' for details
  ],
  exports: [
    // Comment out to change behaviour
    ClickStylerDirective  // See 'app.component.html' for details
  ]
})
export class SharedModule { }
