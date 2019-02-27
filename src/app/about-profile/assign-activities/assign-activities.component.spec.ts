import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignActivitiesComponent } from './assign-activities.component';

describe('AssignActivitiesComponent', () => {
  let component: AssignActivitiesComponent;
  let fixture: ComponentFixture<AssignActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
