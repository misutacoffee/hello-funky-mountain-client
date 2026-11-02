import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractModalComponent } from './create-contract-modal.component';

describe('CreateContractModalComponent', () => {
  let component: CreateContractModalComponent;
  let fixture: ComponentFixture<CreateContractModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
