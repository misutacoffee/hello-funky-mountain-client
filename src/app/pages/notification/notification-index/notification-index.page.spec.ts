import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationIndexPage } from './notification-index.page';

describe('NotificationIndexPage', () => {
  let component: NotificationIndexPage;
  let fixture: ComponentFixture<NotificationIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
