import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentCreateEditPage } from './equipment-create-edit.page';

describe('EquipmentCreateEditPage', () => {
  let component: EquipmentCreateEditPage;
  let fixture: ComponentFixture<EquipmentCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
