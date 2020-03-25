import { TestBed } from '@angular/core/testing';

import { DashboardRedirectGuard } from './dashboard-redirect.guard';

describe('DashboardRedirectGuard', () => {
  let guard: DashboardRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardRedirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
