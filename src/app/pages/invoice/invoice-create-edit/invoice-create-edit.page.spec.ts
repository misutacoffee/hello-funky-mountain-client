import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceCreateEditPage } from './invoice-create-edit.page';

describe('InvoiceCreateEditPage', () => {
  let component: InvoiceCreateEditPage;
  let fixture: ComponentFixture<InvoiceCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
