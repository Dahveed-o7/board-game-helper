import { TestBed } from '@angular/core/testing';
import { IndexedDbGalzyrSaveService } from './indexed-db-galzyr-save.service';

describe('GalzyrSaveService', () => {
  let service: IndexedDbGalzyrSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDbGalzyrSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
