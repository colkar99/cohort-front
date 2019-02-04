import { async, TestBed } from '@angular/core/testing';
import { ContractformEditComponent } from './contractform-edit.component';
describe('ContractformEditComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ContractformEditComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ContractformEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=contractform-edit.component.spec.js.map