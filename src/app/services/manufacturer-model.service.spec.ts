import { TestBed } from '@angular/core/testing';
import { ManufacturerModelService } from './manufacturer-model.service';

describe('ManufacturerModelService', () => {
  let service: ManufacturerModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturerModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
