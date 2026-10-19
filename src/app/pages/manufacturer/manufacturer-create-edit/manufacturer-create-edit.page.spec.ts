import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerCreateEditPage } from './manufacturer-create-edit.page';

describe('ManufacturerCreateEditPage', () => {
  let component: ManufacturerCreateEditPage;
  let fixture: ComponentFixture<ManufacturerCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
