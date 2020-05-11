import { TestBed } from '@angular/core/testing';

import { BuckitListService } from './buckit-list.service';

describe('BuckitListService', () => {
  let service: BuckitListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuckitListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
