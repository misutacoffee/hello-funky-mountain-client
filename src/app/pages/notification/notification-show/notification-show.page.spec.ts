import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationShowPage } from './notification-show.page';

describe('NotificationShowPage', () => {
  let component: NotificationShowPage;
  let fixture: ComponentFixture<NotificationShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
