import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPieComponent } from './budget-pie.component';

describe('BudgetPieComponent', () => {
  let component: BudgetPieComponent;
  let fixture: ComponentFixture<BudgetPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(BudgetPieComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
