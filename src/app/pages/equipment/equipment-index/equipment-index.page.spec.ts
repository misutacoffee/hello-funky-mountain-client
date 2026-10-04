import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentIndexPage } from './equipment-index.page';

describe('EquipmentIndexPage', () => {
  let component: EquipmentIndexPage;
  let fixture: ComponentFixture<EquipmentIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
