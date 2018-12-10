import { TestBed } from '@angular/core/testing';

import { EmailLoginService } from './email-login.service';

describe('EmailLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailLoginService = TestBed.get(EmailLoginService);
    expect(service).toBeTruthy();
  });
});
