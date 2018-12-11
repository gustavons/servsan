import { TestBed } from '@angular/core/testing';

import { DemserviceService } from './demservice.service';

describe('DemserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemserviceService = TestBed.get(DemserviceService);
    expect(service).toBeTruthy();
  });
});
