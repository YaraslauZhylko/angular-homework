import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs';

export interface EditComponent {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<EditComponent> {
  canDeactivate(editComponent: EditComponent) {
    return editComponent.canDeactivate ? editComponent.canDeactivate() : true;
  }
}
