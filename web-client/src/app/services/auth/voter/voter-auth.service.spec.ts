import { TestBed, inject } from '@angular/core/testing';

import { VoterAuthService } from './voter-auth.service';

describe('VoterAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoterAuthService]
    });
  });

  it('should be created', inject([VoterAuthService], (service: VoterAuthService) => {
    expect(service).toBeTruthy();
  }));
});
