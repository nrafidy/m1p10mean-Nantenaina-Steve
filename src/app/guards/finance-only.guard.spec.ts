import { TestBed } from '@angular/core/testing';

import { FinanceOnlyGuard } from './finance-only.guard';

describe('FinanceOnlyGuard', () => {
  let guard: FinanceOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FinanceOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
