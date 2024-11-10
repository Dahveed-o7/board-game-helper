import { TestBed } from '@angular/core/testing';

import { GalzyrSaveService } from './galzyr-save.service';

describe('GalzyrSaveService', () => {
  let service: GalzyrSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalzyrSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
