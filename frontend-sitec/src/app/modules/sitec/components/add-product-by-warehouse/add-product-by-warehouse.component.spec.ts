import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductByWarehouseComponent } from './add-product-by-warehouse.component';

describe('AddProductByWarehouseComponent', () => {
  let component: AddProductByWarehouseComponent;
  let fixture: ComponentFixture<AddProductByWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductByWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductByWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
