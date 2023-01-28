import { TestBed } from '@angular/core/testing';

import { ResFinanceGuard } from './res-finance.guard';

describe('ResFinanceGuard', () => {
  let guard: ResFinanceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResFinanceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
