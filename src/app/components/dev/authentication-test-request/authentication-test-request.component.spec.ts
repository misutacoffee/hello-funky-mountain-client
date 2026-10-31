import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationTestRequestComponent } from './authentication-test-request.component';

describe('AuthenticationTestRequestComponent', () => {
  let component: AuthenticationTestRequestComponent;
  let fixture: ComponentFixture<AuthenticationTestRequestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationTestRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
