import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretDownPopoverComponent } from './caret-down-popover.component';

describe('CaretDownPopoverComponent', () => {
  let component: CaretDownPopoverComponent;
  let fixture: ComponentFixture<CaretDownPopoverComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CaretDownPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
