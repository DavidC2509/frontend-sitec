import { AfterContentInit, Component, Input, OnInit, Output, TemplateRef, ViewChild,EventEmitter } from '@angular/core';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ColumnMode} from '@swimlane/ngx-datatable';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterContentInit {
  _rows: any;
  _columns: any;
  _primaryActions: any[] = [];
  _additionalActions: any[]| null = null;
  colorCustom = false;
  limit=10;

  ColumnMode = ColumnMode;
  messages = {
    emptyMessage: 'No hay regístros para mostrar',
    totalMessage: 'total',
    selectedMessage: 'seleccionados'
  };

  @ViewChild('actionTpl', {static: true})
  actionTpl: TemplateRef<any>|null = null;

  constructor(config: NgbTooltipConfig,private deviceService: DeviceDetectorService) {
    config.placement = 'bottom';
    config.container = 'body';
    config.tooltipClass = 'gray-tooltip';
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  @Input('rows')
  set prop0(value:any) {
    this._rows = value;
  }

  @Input('limit')
  set prop1(value:number) {
    this.limit = value;
  }

  @Input()
  set columns(value: Column[]) {
    const isMovil:boolean=this.deviceService.isMobile();
    const isTablet:boolean=this.deviceService.isTablet();
    if((isMovil || isTablet) && value.length>0){
      const newValue: Column[] = this.showColumnDevice(value,isMovil,isTablet);
      value = [];
      value = newValue;
    }
    (<any>value).push({
      name: '',
      cellTemplate: this.actionTpl,
      maxWidth: 150,
      minWidth: 100,
      width: 150,
      resizeable: false,
      sortable: false,
    });
    this._columns = value;
  }

  @Input()
  set actions(value: Action[]) {
    if (value.length > 3) {
      this._primaryActions = value.splice(0, 3);
      this._additionalActions = value;
    } else {
      this._primaryActions = value;
    }
  }

  @Input("color-custom")
  set prop01(value: boolean) {
    if (value) {
      this.colorCustom = value
    }
  }

  onActionClick(record: Action, row: any) {
    record.callback(row);
  }

  @Output() emitListOrder = new EventEmitter<any>();
  onSort($event:any){
    this.emitListOrder.emit(true);
  }

  showColumnDevice(value: Column[], isMovil:boolean, isTablet:boolean): Column[]{
    const newValue:Column[]=[];
    let i=0;
    if(isMovil && value.length>0){
      for (i=0;i<1;i++) {
        newValue.push(value[i]);
      }
      newValue.push(value[i]);
    }else if(isTablet && value.length>0){
      for (i=0;i<2;i++) {
        newValue.push(value[i]);
      }
      newValue.push(value[i]);
    }
    return newValue;
  }
}

export interface Column {
  name: string;
  prop: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  type?: ColumnType;
  cellTemplate?: any;
}

export enum ColumnType {
  BOOLEAN,
  DATE,
  OBJ,
  NUMBER,
}

export interface Action {
  icon: string;
  label: string;
  callback: (record: any) => void;
}

// En caso de que no recarge la lista se debe clonar la variable
// this.list = JSON.parse(JSON.stringify(this.list));