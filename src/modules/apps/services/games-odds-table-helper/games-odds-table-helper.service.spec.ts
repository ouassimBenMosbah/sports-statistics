import { TestBed } from '@angular/core/testing';

import { GamesOddsTableHelperService } from './games-odds-table-helper.service';

describe('GamesOddsTableHelperService', () => {
  let service: GamesOddsTableHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesOddsTableHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
