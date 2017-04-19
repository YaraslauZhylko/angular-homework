import { Component, Inject, Optional } from '@angular/core';

import { APP_DATA } from '../../shared';

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {

  // appData "optionality" is handled in template projection.
  // Comment out APP_DATA declaration in SharedModule's 'providers' to see the use of default values
  constructor(@Inject(APP_DATA) @Optional() private appData: any ) {}

}
