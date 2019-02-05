import { TestBed } from '@angular/core/testing';
import { ApiCommunicationService } from './api-communication.service';
describe('ApiCommunicationService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ApiCommunicationService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api-communication.service.spec.js.map