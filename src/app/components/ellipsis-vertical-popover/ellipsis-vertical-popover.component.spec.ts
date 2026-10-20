import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsisVerticalPopoverComponent } from './ellipsis-vertical-popover.component';

describe('EllipsisVerticalPopoverComponent', () => {
  let component: EllipsisVerticalPopoverComponent;
  let fixture: ComponentFixture<EllipsisVerticalPopoverComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipsisVerticalPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
