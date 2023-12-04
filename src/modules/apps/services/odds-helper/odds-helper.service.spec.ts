import { TestBed } from '@angular/core/testing';

import { OddsHelperService } from './odds-helper.service';

describe('OddsHelperService', () => {
  let service: OddsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OddsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
