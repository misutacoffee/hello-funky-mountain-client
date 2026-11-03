import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSelectModalComponent } from './equipment-select-modal.component';

describe('EquipmentSelectModalComponent', () => {
  let component: EquipmentSelectModalComponent;
  let fixture: ComponentFixture<EquipmentSelectModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
