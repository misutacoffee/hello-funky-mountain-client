import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageIndexPage } from './message-index.page';

describe('MessageIndexPage', () => {
  let component: MessageIndexPage;
  let fixture: ComponentFixture<MessageIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
