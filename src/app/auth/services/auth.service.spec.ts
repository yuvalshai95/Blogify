/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('Service: Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
