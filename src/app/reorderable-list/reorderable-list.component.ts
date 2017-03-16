import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reorderable-list',
  templateUrl: './reorderable-list.component.html',
  styleUrls: ['./reorderable-list.component.css']
})
export class ReorderableListComponent{

  @Input()  items: Array<string>;

  constructor() { }

  currentItemIdx:number;

  setCurrentItem(itemIdx:number):void {
    this.currentItemIdx = itemIdx;
  }

  isItemSelected():boolean {
    return !(this.currentItemIdx === undefined)
  }

  moveItemUp() {
    if (this.currentItemIdx === 0) return;
    var itemToMove = this.items.splice(this.currentItemIdx, 1)[0];
    this.currentItemIdx--;
    this.items.splice(this.currentItemIdx, 0, itemToMove);
  }

  moveItemDown() {
    if (this.currentItemIdx >= (this.items.length - 1)) return;
    var itemToMove = this.items.splice(this.currentItemIdx, 1)[0];
    this.currentItemIdx++;
    this.items.splice(this.currentItemIdx, 0, itemToMove);
  }

  removeItem() {
    this.items.splice(this.currentItemIdx, 1)[0];
    this.currentItemIdx = undefined;
  }
}
