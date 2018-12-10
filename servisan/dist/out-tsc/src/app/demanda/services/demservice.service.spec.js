import { TestBed } from '@angular/core/testing';
import { DemserviceService } from './demservice.service';
describe('DemserviceService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DemserviceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=demservice.service.spec.js.map