import { TestBed } from '@angular/core/testing';

import { BookmakersService } from './bookmakers.service';

describe('BookmakersService', () => {
  let service: BookmakersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmakersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
