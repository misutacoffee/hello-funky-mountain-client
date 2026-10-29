import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProfilePopoverComponent } from './nav-profile-popover.component';

describe('NavProfilePopoverComponent', () => {
  let component: NavProfilePopoverComponent;
  let fixture: ComponentFixture<NavProfilePopoverComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProfilePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
