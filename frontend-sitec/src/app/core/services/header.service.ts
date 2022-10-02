import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private menuChange!: Subscriber<MenuData|null>;

  constructor() { }

  setMenu(menu: MenuData|null) {
    this.menuChange?.next(menu);
  }

  onMenuChange(): Observable<MenuData> {
    return new Observable((observer) => {
      this.menuChange = observer;
    });
  }
}

export interface MenuData {
  header: MenuItem;
  items: MenuItem[];
}

export interface MenuItem {
  code?: string;
  title: string;
  link?: string;
  children?: MenuItem[];
  queryParams?: any;
}
