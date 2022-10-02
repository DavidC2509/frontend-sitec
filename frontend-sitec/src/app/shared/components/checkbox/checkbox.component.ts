import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import { ControlBasic } from '../../class/control-basic.class';

/**
 * Componente que encapsula el comportamiento de un checkbox, recibe y devuelve un boolean
 *
 * @example
 * <checkbox [formControl]="control('status')"></checkbox>
 */
@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends ControlBasic implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;

  trueTextValue = 'Activo';
  falseTextValue = 'Inactivo';
  idCheckbox = 'checkStatus';

  @Output() changeCheckbox = new EventEmitter<boolean>();

  constructor(
    @Self() public ngControl: NgControl
  ) {
    super();
    this.ngControl.valueAccessor = this;
    this.idCheckbox += Math.ceil(Math.random() * 10000);
  }


  ngOnInit(): void {
    this.inputControl = this.ngControl.control as FormControl;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  /**
   * Texto en caso de estar checkeado el control
   */
  @Input() set trueText(value: string) {
    this.trueTextValue = value;
  }

  /**
   * Texto en caso de no estar checkeado el control
   */
  @Input() set falseText(value: string) {
    this.falseTextValue = value;
  }

  changeCheck( event:any ){
    const value = event.target.checked;
    this.changeCheckbox.emit( value );
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
