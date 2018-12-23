import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupdashboardComponent } from './startupdashboard.component';

describe('StartupdashboardComponent', () => {
  let component: StartupdashboardComponent;
  let fixture: ComponentFixture<StartupdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
