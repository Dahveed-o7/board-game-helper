import { TestBed } from '@angular/core/testing';

import { GalzyrService } from './galzyr.service';

describe('GalzyrService', () => {
  let service: GalzyrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalzyrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
