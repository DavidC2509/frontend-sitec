import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitsProductComponent } from './lits-product.component';

describe('LitsProductComponent', () => {
  let component: LitsProductComponent;
  let fixture: ComponentFixture<LitsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitsProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
