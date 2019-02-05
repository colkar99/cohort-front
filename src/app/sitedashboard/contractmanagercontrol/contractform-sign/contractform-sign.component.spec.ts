import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractformSignComponent } from './contractform-sign.component';

describe('ContractformSignComponent', () => {
  let component: ContractformSignComponent;
  let fixture: ComponentFixture<ContractformSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractformSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractformSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
