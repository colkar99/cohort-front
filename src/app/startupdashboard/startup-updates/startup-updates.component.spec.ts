import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupUpdatesComponent } from './startup-updates.component';

describe('StartupUpdatesComponent', () => {
  let component: StartupUpdatesComponent;
  let fixture: ComponentFixture<StartupUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
