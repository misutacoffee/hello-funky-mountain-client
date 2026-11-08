import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalEquipmentShowPage } from './rental-equipment-show.page';

describe('RentalEquipmentShowPage', () => {
  let component: RentalEquipmentShowPage;
  let fixture: ComponentFixture<RentalEquipmentShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalEquipmentShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
