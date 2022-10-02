import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductByWarehouseComponent } from './sell-product-by-warehouse.component';

describe('SellProductByWarehouseComponent', () => {
  let component: SellProductByWarehouseComponent;
  let fixture: ComponentFixture<SellProductByWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellProductByWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductByWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
