import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './../../..';

@Component({
  selector: '[app-user-entry]',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./../../../../shared/css/shared.css']
})
export class UserEntryComponent {

  @Input() user: User;
  @Input() modifiedUser: Object;
  @HostBinding('style.cursor') cursor = 'pointer';
  @HostBinding('class.hover') hoverDecoration: boolean;

  @HostListener('mouseenter', ['$event']) onMouseEnter(event) {
    this.hoverDecoration = true;
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.hoverDecoration = false;
  }

  @HostListener('click', ['$event']) onClick(event) {
    this.router.navigate([this.user.id, 'edit'], {relativeTo: this.route});
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
}
