import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManufacturerModalComponent } from './create-manufacturer-modal.component';

describe('CreateManufacturerModalComponent', () => {
  let component: CreateManufacturerModalComponent;
  let fixture: ComponentFixture<CreateManufacturerModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManufacturerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
