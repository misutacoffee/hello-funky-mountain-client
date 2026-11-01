import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelModalComponent } from './create-model-modal.component';

describe('CreateModelModalComponent', () => {
  let component: CreateModelModalComponent;
  let fixture: ComponentFixture<CreateModelModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
