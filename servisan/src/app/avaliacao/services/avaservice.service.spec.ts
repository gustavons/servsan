import { TestBed } from '@angular/core/testing';

import { AvaserviceService } from './avaservice.service';

describe('AvaserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaserviceService = TestBed.get(AvaserviceService);
    expect(service).toBeTruthy();
  });
});
