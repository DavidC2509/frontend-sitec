import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCountProductComponent } from './update-count-product.component';

describe('UpdateCountProductComponent', () => {
  let component: UpdateCountProductComponent;
  let fixture: ComponentFixture<UpdateCountProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCountProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCountProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
