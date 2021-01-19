import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionsDataComponent } from './evolutions-data.component';

describe('EvolutionsDataComponent', () => {
  let component: EvolutionsDataComponent;
  let fixture: ComponentFixture<EvolutionsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
