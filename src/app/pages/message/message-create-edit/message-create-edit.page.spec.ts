import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageCreateEditPage } from './message-create-edit.page';

describe('MessageCreateEditPage', () => {
  let component: MessageCreateEditPage;
  let fixture: ComponentFixture<MessageCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
