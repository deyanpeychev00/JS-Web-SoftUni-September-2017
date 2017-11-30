import { TestBed, inject } from '@angular/core/testing';

import { RouterAuthService } from './router-auth.service';

describe('RouterAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterAuthService]
    });
  });

  it('should be created', inject([RouterAuthService], (service: RouterAuthService) => {
    expect(service).toBeTruthy();
  }));
});
