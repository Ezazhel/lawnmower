import { TestBed } from '@angular/core/testing';

import { NeighboorService } from './neighboor.service';

describe('NeighboorService', () => {
  let service: NeighboorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighboorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
