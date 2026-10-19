import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelShowPage } from './model-show.page';

describe('ModelShowPage', () => {
  let component: ModelShowPage;
  let fixture: ComponentFixture<ModelShowPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
