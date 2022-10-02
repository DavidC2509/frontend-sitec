import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsWarehouseProductComponent } from './lits-warehouse-product.component';

describe('LitsWarehouseProductComponent', () => {
  let component: LitsWarehouseProductComponent;
  let fixture: ComponentFixture<LitsWarehouseProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitsWarehouseProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitsWarehouseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
