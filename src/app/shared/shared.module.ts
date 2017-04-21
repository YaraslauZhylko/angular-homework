import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { API_URL } from './';
import { APP_DATA, AppData } from './';
import { UNIQUE_ID_8, UNIQUE_ID_16, UniqueID } from './';
import { StorageService } from './';
import { ClickStylerDirective } from './';

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
