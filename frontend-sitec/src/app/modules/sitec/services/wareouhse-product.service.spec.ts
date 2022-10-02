import { TestBed } from '@angular/core/testing';

import { WareouhseProductService } from './wareouhse-product.service';

describe('WareouhseProductService', () => {
  let service: WareouhseProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WareouhseProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
