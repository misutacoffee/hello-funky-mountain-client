import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentalModalComponent } from './create-rental-modal.component';

describe('CreateRentalModalComponent', () => {
  let component: CreateRentalModalComponent;
  let fixture: ComponentFixture<CreateRentalModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRentalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
