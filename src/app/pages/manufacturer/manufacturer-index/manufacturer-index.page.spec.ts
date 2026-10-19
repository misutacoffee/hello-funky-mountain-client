import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerIndexPage } from './manufacturer-index.page';

describe('ManufacturerIndexPage', () => {
  let component: ManufacturerIndexPage;
  let fixture: ComponentFixture<ManufacturerIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
