import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentShowPage } from './equipment-show.page';

describe('EquipmentShowPage', () => {
  let component: EquipmentShowPage;
  let fixture: ComponentFixture<EquipmentShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
