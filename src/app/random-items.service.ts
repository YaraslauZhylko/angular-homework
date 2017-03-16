import { Injectable } from '@angular/core';

@Injectable()
export class RandomItemsService {

  constructor() { }

  getItems(numberOfItems: Number): Array<string> {
    var items:Array<string> = [];
    for (var i = 0; i < numberOfItems; i++) {
      items.push('Item ' + [Math.ceil(Math.random() * 100)]);
    }
    return items;
  }
}
