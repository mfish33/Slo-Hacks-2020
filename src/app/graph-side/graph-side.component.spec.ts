import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSideComponent } from './graph-side.component';

describe('GraphSideComponent', () => {
  let component: GraphSideComponent;
  let fixture: ComponentFixture<GraphSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(GraphSideComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
