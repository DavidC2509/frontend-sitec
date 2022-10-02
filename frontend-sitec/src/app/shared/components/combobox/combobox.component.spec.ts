import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormControl, FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {CoreTestingModule} from 'src/app/core/testing/core-testing.module';
import {RawCommunicatorService} from '../../services/raw-communicator.service';

import { ComboboxComponent } from './combobox.component';

describe('ComboboxComponent', () => {
  let component: ComboboxComponent;
  let fixture: ComponentFixture<ComboboxComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate() {}
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ ComboboxComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreTestingModule
      ],
      providers: [
        RawCommunicatorService
      ]
    })
    .overrideComponent(ComboboxComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
