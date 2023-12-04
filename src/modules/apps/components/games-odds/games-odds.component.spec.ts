import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesOddsComponent } from './games-odds.component';

describe('GamesOddsComponent', () => {
  let component: GamesOddsComponent;
  let fixture: ComponentFixture<GamesOddsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesOddsComponent]
    });
    fixture = TestBed.createComponent(GamesOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
