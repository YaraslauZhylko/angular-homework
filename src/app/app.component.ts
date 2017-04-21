import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_DATA } from './shared';
import { CartService } from './orders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./shared/css/shared.css']
})
export class AppComponent implements OnInit {

  private cartItemsCount: Observable<number>;

  // appData "optionality" is handled in template projection.
  // Comment out APP_DATA declaration in SharedModule's 'providers' to see the use of default values

  constructor(
    @Inject(APP_DATA) @Optional() private appData: any,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartItemsCount = this.cartService.itemsCount;
  }
}
