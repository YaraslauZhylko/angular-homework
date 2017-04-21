import { Pipe, PipeTransform } from '@angular/core';

import { User } from './..';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, showRole?: boolean): string {
    let fullName = `${user.firstName} ${user.lastName}`;
    if (showRole) {
        let role = user.isAdmin ? 'admin' : 'client';
        fullName = `${fullName} (${role})`;
    }
    return fullName;
  }
}
