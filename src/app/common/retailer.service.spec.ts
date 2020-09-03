import { TestBed } from '@angular/core/testing';

import { RetailerService } from './retailer.service';

describe('RetailerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetailerService = TestBed.inject(RetailerService);
    expect(service).toBeTruthy();
  });
});
