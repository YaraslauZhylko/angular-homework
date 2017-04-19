import { Component, Inject, Optional, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { APP_DATA } from './shared';
import { CartService } from './orders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./shared/css/shared.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private cartItemsCount: number = 0;

  // appData "optionality" is handled in template projection.
  // Comment out APP_DATA declaration in SharedModule's 'providers' to see the use of default values

  constructor(
    @Inject(APP_DATA) @Optional() private appData: any,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.sub = this.cartService.itemsCount
      .subscribe(count => this.cartItemsCount = count);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
