import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractformEditComponent } from './contractform-edit.component';

describe('ContractformEditComponent', () => {
  let component: ContractformEditComponent;
  let fixture: ComponentFixture<ContractformEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractformEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
