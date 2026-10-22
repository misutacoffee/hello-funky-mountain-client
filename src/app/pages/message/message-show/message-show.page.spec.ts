import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageShowPage } from './message-show.page';

describe('MessageShowPage', () => {
  let component: MessageShowPage;
  let fixture: ComponentFixture<MessageShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
