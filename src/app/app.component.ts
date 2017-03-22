import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Second Angular Homework";
  subtitle = "Public Library"
  name = {first: "Yaraslau", last: "Zhylko"};

}
