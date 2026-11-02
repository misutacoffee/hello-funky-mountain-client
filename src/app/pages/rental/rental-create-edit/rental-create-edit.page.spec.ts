import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalCreateEditPage } from './rental-create-edit.page';

describe('RentalCreateEditPage', () => {
  let component: RentalCreateEditPage;
  let fixture: ComponentFixture<RentalCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
