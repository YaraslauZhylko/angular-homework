import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class IsAdminFeatureAreaResolveGuard implements Resolve<Boolean> {

  resolve(): Boolean {
    return true;
  }
}
