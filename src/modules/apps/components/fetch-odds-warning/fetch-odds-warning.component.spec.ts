import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchOddsWarningComponent } from './fetch-odds-warning.component';

describe('FetchOddsWarningComponent', () => {
  let component: FetchOddsWarningComponent;
  let fixture: ComponentFixture<FetchOddsWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchOddsWarningComponent]
    });
    fixture = TestBed.createComponent(FetchOddsWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
