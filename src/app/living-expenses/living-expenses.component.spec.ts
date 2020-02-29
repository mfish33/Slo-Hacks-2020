import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingExpensesComponent } from './living-expenses.component';

describe('LivingExpensesComponent', () => {
  let component: LivingExpensesComponent;
  let fixture: ComponentFixture<LivingExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivingExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
