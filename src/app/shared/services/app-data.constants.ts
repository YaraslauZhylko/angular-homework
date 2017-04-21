import { OpaqueToken } from '@angular/core';

export const APP_DATA = new OpaqueToken('AppData');

export const AppData = {
  title: "Book Store",
  subTitle: "Sixth Angular Homework",
  author: { firstName: "Yaraslau", lastName: "Zhylko"}
}
