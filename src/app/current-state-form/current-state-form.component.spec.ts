import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStateFormComponent } from './current-state-form.component';

describe('CurrentStateFormComponent', () => {
  let component: CurrentStateFormComponent;
  let fixture: ComponentFixture<CurrentStateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
