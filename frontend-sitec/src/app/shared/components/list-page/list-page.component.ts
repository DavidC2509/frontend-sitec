import { AfterViewInit, Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MenuService} from 'src/app/core/services/menu.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  options: ListPageOption = {
    title: '',
    breadcrumb: []
  };

  constructor(
    public menu: MenuService,
    public router: Router,
    public alert: ToastService,
  ) { }

  ngOnInit(): void {
  }
}

export interface ListPageOption {
  title: string;
  customTitle?: string;
  breadcrumb?: {link: string, label: string}[];
  module?: string;
}

export const OPTION = new InjectionToken<ListPageOption>('Options List Page');

@Component({
  template: '',
  providers: [
    {
      provide: OPTION,
      useValue: <any>{}
    }
  ]
})
export abstract class ListPageBase implements OnInit, AfterViewInit {
  protected listPageInstance!: ListPageComponent;

  constructor(
    @Inject(OPTION) public options: ListPageOption
  ) {}

  @ViewChild(ListPageComponent)
  set listPage(value: ListPageComponent) {
    this.listPageInstance = value;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.listPageInstance.options = this.options;
      this.onInit();
    });
  }

  editBreadcrumb(record:I_BreadcrumbEdit){
    if(this.options?.breadcrumb){
      if(this.options.breadcrumb.length>record.position){
        this.options.breadcrumb[record.position] = {label: record.label, link:record.link}
      }
    }
  }
  
  setTitle(title:string){
    this.options.title = title;
  }

  get menu() {
    return this.listPageInstance.menu;
  }

  get router() {
    return this.listPageInstance.router;
  }

  get alert() {
    return this.listPageInstance.alert;
  }

  abstract onInit(): void;
}

interface I_BreadcrumbEdit{
  position: number;
  link: string;
  label: string;
}

