import { TestBed } from '@angular/core/testing';

import { ImagekitService } from './imagekit.service';

describe('ImagekitService', () => {
  let service: ImagekitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagekitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
