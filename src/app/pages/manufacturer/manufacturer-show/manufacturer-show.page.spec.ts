import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerShowPage } from './manufacturer-show.page';

describe('ManufacturerShowPage', () => {
  let component: ManufacturerShowPage;
  let fixture: ComponentFixture<ManufacturerShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
