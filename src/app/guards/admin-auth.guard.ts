import { Injectable }  from '@angular/core';

import { AuthGuard } from '.';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  checkLoginSpecific(): boolean {
    if (this.authService.isLoggedInAsAdmin()) return true;
    alert('You do not have enough privileges to access admin section.');
    return false;
  }
}
