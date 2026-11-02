import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceIndexPage } from './invoice-index.page';

describe('InvoiceIndexPage', () => {
  let component: InvoiceIndexPage;
  let fixture: ComponentFixture<InvoiceIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
