import { Component, Inject, Optional, OnInit } from '@angular/core';

import { APP_DATA } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // appData "optionality" is handled in template projection.
  // Comment out APP_DATA declaration in SharedModule's 'providers' to see the use of default values

  constructor(@Inject(APP_DATA) @Optional() private appData: any ) {}

}
