import { AfterViewInit, Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuService} from 'src/app/core/services/menu.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
  options: FormPageOption = {
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

export interface FormPageOption {
  title: string;
  breadcrumb?: {link: string, label: string}[],
  module?: string;
}

export const OPTION = new InjectionToken<FormPageOption>('Options Form Page');

@Component({
  template: '',
  providers: [
    {
      provide: OPTION,
      useValue: <any>{}
    }
  ]
})
export abstract class FormPageBase implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  isCreate: boolean = false;
  protected formPageInstance!: FormPageComponent;

  constructor(
    @Inject(OPTION) public options: FormPageOption
  ) {}

  @ViewChild(FormPageComponent)
  set formPage(value: FormPageComponent) {
    this.formPageInstance = value;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formPageInstance.options = this.options;
      this.isCreate = this.router.url.endsWith('/create');
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

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }

  get menu() {
    return this.formPageInstance.menu;
  }

  get router() {
    return this.formPageInstance.router;
  }

  get alert() {
    return this.formPageInstance.alert;
  }

  abstract onInit(): void;
}

interface I_BreadcrumbEdit{
  position: number;
  link: string;
  label: string;
}