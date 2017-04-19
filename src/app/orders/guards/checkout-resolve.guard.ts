import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';

import { Order, OrderData, CartService } from './..';
import { AuthService } from './../../services';

@Injectable()
export class CheckoutResolveGuard implements Resolve<OrderData> {

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): OrderData {
    // Clean items with 0 count from the cart.
    this.cartService.clean();
    // Get cart items
    let orderItems = this.cartService.getItems();
    if (!orderItems.length) this.goBack("No items in the cart.");
    // Get logged-in user
    if (!this.authService.isLoggedIn()) this.goBack("User is not logged in.")
    let client = this.authService.user;
    // Create order
    let order = new Order(null, orderItems, client.id, "");
    // Return order data
    return new OrderData(order, client);
  }

  goBack(error) {
    alert(error);
    this.router.navigate(['cart']);
  }
}
