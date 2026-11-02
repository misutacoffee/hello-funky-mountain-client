import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceShowPage } from './invoice-show.page';

describe('InvoiceShowPage', () => {
  let component: InvoiceShowPage;
  let fixture: ComponentFixture<InvoiceShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
