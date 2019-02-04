import { async, TestBed } from '@angular/core/testing';
import { CurrentStateFormComponent } from './current-state-form.component';
describe('CurrentStateFormComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CurrentStateFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CurrentStateFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=current-state-form.component.spec.js.map