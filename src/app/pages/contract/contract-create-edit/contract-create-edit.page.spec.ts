import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractCreateEditPage } from './contract-create-edit.page';

describe('ContractCreateEditPage', () => {
  let component: ContractCreateEditPage;
  let fixture: ComponentFixture<ContractCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
