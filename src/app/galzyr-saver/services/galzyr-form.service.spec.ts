import { TestBed } from '@angular/core/testing';

import { GalzyrFormService } from './galzyr-form.service';

describe('GalzyrFormService', () => {
  let service: GalzyrFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalzyrFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
