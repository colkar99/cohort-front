import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsBoardComponent } from './charts-board.component';

describe('ChartsBoardComponent', () => {
  let component: ChartsBoardComponent;
  let fixture: ComponentFixture<ChartsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
