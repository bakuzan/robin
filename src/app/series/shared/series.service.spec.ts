import { TestBed } from '@angular/core/testing';

import { SeriesService } from './series.service';

describe('SeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesService = TestBed.inject(SeriesService);
    expect(service).toBeTruthy();
  });
});
