import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CoreTestingModule} from 'src/app/core/testing/core-testing.module';
import {SharedModule} from '../../shared.module';

import { ListPageComponent } from './list-page.component';

describe('FormListComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreTestingModule
      ],
      declarations: [ ListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
