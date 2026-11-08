import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevNavigateBackTestComponent } from './dev-navigate-back-test.component';

describe('DevNavigateBackTestComponent', () => {
  let component: DevNavigateBackTestComponent;
  let fixture: ComponentFixture<DevNavigateBackTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DevNavigateBackTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
