import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSessionsComponent } from './program-sessions.component';

describe('ProgramSessionsComponent', () => {
  let component: ProgramSessionsComponent;
  let fixture: ComponentFixture<ProgramSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});