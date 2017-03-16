import { Component, OnInit } from '@angular/core';
import { RandomItemsService } from './random-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public randomItemsService:RandomItemsService) {}

  title = "First Angular homework!";
  description = ["My", "first", "test", "application", "in", "Angular", "2.x"];
  name = {first: "Yaraslau", last: "Zhylko"};

  isShowRandomItems = true;
  randomItems:Array<string> = []

  ngOnInit() {
    this.getRandomItems();
  }

  getRandomItems() {
      this.randomItems = this.randomItemsService.getItems(10);
  }

  toggleShowRandomItems() {
      this.isShowRandomItems = !this.isShowRandomItems;
  }
}
