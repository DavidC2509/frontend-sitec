import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsWarehouseComponent } from './lits-warehouse.component';

describe('LitsWarehouseComponent', () => {
  let component: LitsWarehouseComponent;
  let fixture: ComponentFixture<LitsWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitsWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitsWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
