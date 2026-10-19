import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelIndexPage } from './model-index.page';

describe('ModelIndexPage', () => {
  let component: ModelIndexPage;
  let fixture: ComponentFixture<ModelIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
