import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  set(id: string, data: any): void {
    localStorage.setItem(id, JSON.stringify(data));
  }

  get(id: string): any {
    let data = localStorage.getItem(id);
    return data ? JSON.parse(data) : data;
  }

  getAll(): Array<any> {
    var allData = [];
    for(var i =0; i < localStorage.length; i++){
      allData.push(this.get(localStorage.key(i)));
    }
    return allData;
  }

  remove(id: string): void {
    localStorage.removeItem(id);
  }

}
