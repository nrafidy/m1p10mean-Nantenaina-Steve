import { TestBed } from '@angular/core/testing';

import { ResAtelierGuard } from './res-atelier.guard';

describe('ResAtelierGuard', () => {
  let guard: ResAtelierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResAtelierGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
