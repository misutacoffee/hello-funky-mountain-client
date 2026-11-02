import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractIndexPage } from './contract-index.page';

describe('ContractIndexPage', () => {
  let component: ContractIndexPage;
  let fixture: ComponentFixture<ContractIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
