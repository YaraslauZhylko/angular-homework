import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private getId(entityType: string, id: string): string {
    return entityType + '_' + id;
  }

  set(entityType: string, id: string, data: any): void {
    localStorage.setItem(this.getId(entityType, id), JSON.stringify(data));
  }

  get(entityType: string, id: string): any {
    let data = localStorage.getItem(this.getId(entityType, id));
    return data ? JSON.parse(data) : data;
  }

  getAll(entityType: string): Array<any> {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.getId(entityType, '')))
      .map(key => localStorage.getItem(key))
      .map(data => data ? JSON.parse(data) : data);
  }

  remove(entityType: string, id: string): void {
    localStorage.removeItem(this.getId(entityType, id));
  }
}
