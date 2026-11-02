import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalShowPage } from './rental-show.page';

describe('RentalShowPage', () => {
  let component: RentalShowPage;
  let fixture: ComponentFixture<RentalShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
