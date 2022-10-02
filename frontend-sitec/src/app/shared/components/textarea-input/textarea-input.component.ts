import { Component, Input, OnInit, Self } from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import { ControlBasic } from '../../class/control-basic.class';

/**
 * Componente que encapsula el comportamiento de un textarea.
 * Recibe una cadena y devolviendo la cadena
 *
 * @example
 * <textarea-input
 *  [formControl]="control('description')"
 *  type="text"
 *  placeholder="Introducir Descripción"
 *  ></textarea-input>
 */
@Component({
  selector: 'textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss']
})
export class TextareaInputComponent extends ControlBasic implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;
  placeholderValue = '';

  constructor(
    @Self() public ngControl: NgControl
  ) {
    super();
    this.ngControl.valueAccessor = this;
  }

  /**
   * Texto que se muestra en caso de que el control no tenga valor
   */
  @Input()
  set placeholder(value: string) {
    this.placeholderValue = value;
  }

   isFocusActive = false;
  @Input("isFocusActive")
  set prop02(value: boolean) {
    this.isFocusActive = value;
  }

  ngOnInit(): void {
    this.inputControl = this.ngControl.control as FormControl;
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
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
