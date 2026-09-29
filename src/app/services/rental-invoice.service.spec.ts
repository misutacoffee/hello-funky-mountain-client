import { TestBed } from '@angular/core/testing';
import { RentalInvoiceService } from './rental-invoice.service';

describe('RentalInvoiceService', () => {
  let service: RentalInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
