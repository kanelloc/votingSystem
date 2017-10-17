import { TestBed, inject } from '@angular/core/testing';

import { CandidateAuthService } from './candidate-auth.service';

describe('CandidateAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidateAuthService]
    });
  });

  it('should be created', inject([CandidateAuthService], (service: CandidateAuthService) => {
    expect(service).toBeTruthy();
  }));
});
