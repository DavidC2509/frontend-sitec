import { Component, Input, OnInit, Self, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ControlBasic } from '../../class/control-basic.class';

/**
 * Componente que encapsula el comportamiento de entrada de texto.
 * Recibe un texto y devuelve un texto
 *
 * @example
 * <text-input
 *  [formControl]="control('name')"
 *  type="text"
 *  placeholder="Ingresar Nombre"
 *  (onKeyUp)="onKeyUp($event)"
 *  (onBlur)="onBlur($event)"
 * ></text-input>
 */
@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends ControlBasic implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  disabled = false;
  typeValue = 'text';
  placeholderValue = '';
  isNegativeValue = false;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.ngControl.valueAccessor = this;
  }

  /**
   * Tipo de input que se usura text|password|email|number
   */
  @Input()
  set type(value: string) {
    this.typeValue = value;
  }
  

  /**
   * Texto que se mostrara en el input cuando se encuentre vacio
   */
  @Input()
  set placeholder(value: string) {
    this.placeholderValue = value;
  }

  /**
   * Boleano para recibir numeros negativos
   */
  @Input()
  set isNegative(value: boolean|null) {
    if(value!=null){
      this.isNegativeValue = value;
    }
  }

  ngOnInit(): void {
    this.inputControl = this.ngControl.control as FormControl;
  }

  get control(): FormControl {
    return this.inputControl as FormControl;
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /*
  * Evento se emite cuando pierde el foco el input
  */
  @Output() onBlur = new EventEmitter<string>();
  onBlurEvent(event: any) {
    
    this.onBlur.emit(event.target.value);
  }

  /*
  * Evento se emite cuando presiona una tecla input
  */
  @Output() onKeyUp = new EventEmitter<any>();
  onKeyUpEvent(event: any) {
    this.onKeyUp.emit(event.target.value);
  }

}
