import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInputSideComponent } from './data-input-side.component';

describe('DataInputSideComponent', () => {
  let component: DataInputSideComponent;
  let fixture: ComponentFixture<DataInputSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInputSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInputSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
