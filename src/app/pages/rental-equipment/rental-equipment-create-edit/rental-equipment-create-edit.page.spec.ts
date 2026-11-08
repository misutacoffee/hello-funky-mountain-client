import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalEquipmentCreateEditPage } from './rental-equipment-create-edit.page';

describe('RentalEquipmentCreateEditPage', () => {
  let component: RentalEquipmentCreateEditPage;
  let fixture: ComponentFixture<RentalEquipmentCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalEquipmentCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
