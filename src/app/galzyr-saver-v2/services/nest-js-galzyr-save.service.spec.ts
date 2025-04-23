import { TestBed } from '@angular/core/testing';

import { NestJsGalzyrSaveService } from './nest-js-galzyr-save.service';

describe('NestJsGalzyrSaveService', () => {
  let service: NestJsGalzyrSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NestJsGalzyrSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
