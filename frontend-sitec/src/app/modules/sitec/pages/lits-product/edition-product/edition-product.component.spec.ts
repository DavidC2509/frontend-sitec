import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionProductComponent } from './edition-product.component';

describe('EditionProductComponent', () => {
  let component: EditionProductComponent;
  let fixture: ComponentFixture<EditionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
