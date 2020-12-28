import { TestBed } from '@angular/core/testing';

import { IdlingService } from './idling.service';

describe('IdlingService', () => {
  let service: IdlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
