import { TestBed } from '@angular/core/testing';

import { BuckitService } from './buckit.service';

describe('BuckitService', () => {
  let service: BuckitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuckitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
