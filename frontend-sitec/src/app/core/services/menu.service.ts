import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HeaderService, MenuData } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menu: {[id: string]: MenuData} = {};
  private processed: {[id: string]: boolean} = {};  
  
  constructor(
    private header: HeaderService,
    router:Router,
  ) { 
    
  }

  register(key: string, menu: MenuData) {    
    this.menu[key] = menu;
  }


}
