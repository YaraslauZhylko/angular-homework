import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppData, UniqueID, StorageService } from './';
import { ClickStylerDirective } from './';

export const APP_DATA = new OpaqueToken('AppData');
export const UNIQUE_ID_8 = new OpaqueToken('UniqueID');
export const UNIQUE_ID_16 = new OpaqueToken('UniqueID');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickStylerDirective
  ],
  providers: [
    { provide: APP_DATA, useValue: AppData},
    { provide: UNIQUE_ID_8, useFactory: UniqueID(8) },
    { provide: UNIQUE_ID_16, useFactory: UniqueID(16) },
    { provide: StorageService, useClass: StorageService },
  ],
  exports: [
    ClickStylerDirective
  ]
})
export class SharedModule { }
