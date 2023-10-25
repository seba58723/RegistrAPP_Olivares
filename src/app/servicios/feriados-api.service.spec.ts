import { TestBed } from '@angular/core/testing';

import { FeriadosAPIService } from './feriados-api.service';

describe('FeriadosAPIService', () => {
  let service: FeriadosAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriadosAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
