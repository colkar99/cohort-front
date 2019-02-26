import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramSessionsComponent } from './create-program-sessions.component';

describe('CreateProgramSessionsComponent', () => {
  let component: CreateProgramSessionsComponent;
  let fixture: ComponentFixture<CreateProgramSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProgramSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgramSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
