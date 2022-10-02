import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { RawCommunicatorService } from 'src/app/core/services/raw-communicator.service';

/**
 * Componente que encapsula el comportamiento de un combo.
 * Recibe un numero (id) y devuelve un numero
 *
 * @example
 * <combo-box
 *  [formControl]="control('type')"
 *  url="/document/label/type/?status=true"
 *  key="id"
 *  value="name"
 * >
 * </combo-box>
 */
@Component({
  selector: 'combo-box',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  disabled = false;
  list: any[] = [];
  urlField: string = '';
  keyField: string = '';
  valueField: string = '';

  model: any = null;

  isCache: boolean = false;

  isLoading: boolean = false;

  constructor(
    @Self() public ngControl: NgControl,
    private raw: RawCommunicatorService
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.reload();
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  /**
   * Direccion url de donde debe se obtendra los datos del combo
   */
  @Input()
  set url(value: string) {
    this.urlField = value;
    this.reload();
  }

  /**
   * Campo llave que sera usado para obtener el llave del listado de opciones.
   */
  @Input()
  set key(value: string) {
    this.keyField = value;
  }

  @Input()
  set listData(value: any[]) {
    this.list = value;
  }
  /**
   * Campo valor que sera usado para obtener el valor del listado de opciones.
   */
  @Input()
  set value(value: string) {
    this.valueField = value;
  }

  /**
   * Verificando si es Cache o no
   */
  @Input("isCache")
  set pro0(value: boolean) {
    this.isCache = value;
  }

    /**
   * Verificando si es Cache o no
   */
  @Input("disabled")
  set pro1(value: boolean) {
    this.disabled = value;
  }

  reload(): void {
    if (!this.urlField) {
      return;
    }
    this.isLoading = true;
    this.raw.read(this.urlField).subscribe({
      next: (response) => {
        this.list = response as any[];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  writeValue(obj: any): void {
    this.model = obj;
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

  showErrors(): string {
    let response = '';

    if (this.ngControl.invalid) {
      if (this.ngControl.errors !== null) {
        if (this.ngControl.errors['required']) {
          response += 'Obligatorio\n';
        }
      }
    }

    return response;
  }

  onChangeModel(): void {
    if (this.isCache) {
      this.onChange(this.list.find((e) => e[this.keyField] === this.model));
    } else {
      this.onChange(this.model);
    }

    if (this.model == "") {
      this.onChange(null);
    }
  }
}
