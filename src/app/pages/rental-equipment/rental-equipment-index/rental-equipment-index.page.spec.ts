import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalEquipmentIndexPage } from './rental-equipment-index.page';

describe('RentalEquipmentIndexPage', () => {
  let component: RentalEquipmentIndexPage;
  let fixture: ComponentFixture<RentalEquipmentIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalEquipmentIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
