import { TestBed } from '@angular/core/testing';
import { CadService } from './user.service';
describe('UserService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CadService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=user.service.spec.js.map