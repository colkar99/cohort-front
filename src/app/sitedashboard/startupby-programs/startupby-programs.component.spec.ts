import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupbyProgramsComponent } from './startupby-programs.component';

describe('StartupbyProgramsComponent', () => {
  let component: StartupbyProgramsComponent;
  let fixture: ComponentFixture<StartupbyProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupbyProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupbyProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
