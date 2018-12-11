import { TestBed } from '@angular/core/testing';

import { CadService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadService = TestBed.get(CadService);
    expect(service).toBeTruthy();
  });
});
