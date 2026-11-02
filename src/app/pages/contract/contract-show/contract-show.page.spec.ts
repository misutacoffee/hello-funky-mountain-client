import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractShowPage } from './contract-show.page';

describe('ContractShowPage', () => {
  let component: ContractShowPage;
  let fixture: ComponentFixture<ContractShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
