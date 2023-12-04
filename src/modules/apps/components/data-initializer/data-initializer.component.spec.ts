import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInitializerComponent } from './data-initializer.component';

describe('DataInitializerComponent', () => {
  let component: DataInitializerComponent;
  let fixture: ComponentFixture<DataInitializerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataInitializerComponent]
    });
    fixture = TestBed.createComponent(DataInitializerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
