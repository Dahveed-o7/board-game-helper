import { TestBed } from '@angular/core/testing';

import { IDBService } from './indexed-db.service';

describe('IndexedDbService', () => {
  let service: IDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
