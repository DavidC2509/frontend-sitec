import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormsModule, NgControl, ReactiveFormsModule, Validators} from '@angular/forms';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate() {}
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ TextInputComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .overrideComponent(TextInputComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe permitir definir tipo de input', () => {
    component.type = 'email';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('input').getAttribute('type')).toBe('email');
  });

  it('Debe permitir definir placeholder', () => {
    component.placeholder = '1234';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('input').getAttribute('placeholder')).toBe('1234');
  });

  it('Debe mostrar un mensaje de error en caso de ser obligatorio', () => {
    component.ngControl.control?.setValidators([Validators.required]);
    component.ngControl.control?.updateValueAndValidity();

    expect(component.showErrors()).toContain('Obligatorio');
  });
});
