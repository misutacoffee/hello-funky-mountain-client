import { TestBed } from '@angular/core/testing';
import { RentalEquipmentService } from './rental-equipment.service';

describe('RentalEquipmentService', () => {
  let service: RentalEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
