import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificGameBonusComponent } from './specific-game-bonus.component';

describe('SpecificGameBonusComponent', () => {
  let component: SpecificGameBonusComponent;
  let fixture: ComponentFixture<SpecificGameBonusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificGameBonusComponent]
    });
    fixture = TestBed.createComponent(SpecificGameBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
