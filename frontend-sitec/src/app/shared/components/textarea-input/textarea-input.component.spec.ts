import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';

import { TextareaInputComponent } from './textarea-input.component';

describe('TextareaInputComponent', () => {
  let component: TextareaInputComponent;
  let fixture: ComponentFixture<TextareaInputComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate() {}
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ TextareaInputComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .overrideComponent(TextareaInputComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
