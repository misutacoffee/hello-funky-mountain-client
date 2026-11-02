import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentalIndexPage } from './rental-index.page';

describe('RentalIndexPage', () => {
  let component: RentalIndexPage;
  let fixture: ComponentFixture<RentalIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
