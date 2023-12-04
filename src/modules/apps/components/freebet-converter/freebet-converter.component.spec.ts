import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreebetConverterComponent } from './freebet-converter.component';

describe('FreebetConverterComponent', () => {
  let component: FreebetConverterComponent;
  let fixture: ComponentFixture<FreebetConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreebetConverterComponent]
    });
    fixture = TestBed.createComponent(FreebetConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
