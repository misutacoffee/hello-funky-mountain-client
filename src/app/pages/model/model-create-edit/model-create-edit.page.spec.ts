import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelCreateEditPage } from './model-create-edit.page';

describe('ModelCreateEditPage', () => {
  let component: ModelCreateEditPage;
  let fixture: ComponentFixture<ModelCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
