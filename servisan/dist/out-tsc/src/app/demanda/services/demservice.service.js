var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
;
var DemserviceService = /** @class */ (function () {
    function DemserviceService(db) {
        this.demsCollection = db.collection('Demanda');
        this.dems = this.demsCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    }
    DemserviceService.prototype.getDems = function () {
        return this.dems;
    };
    DemserviceService.prototype.getDem = function (id) {
        return this.demsCollection.doc(id).valueChanges();
    };
    DemserviceService.prototype.updateDem = function (dem, id) {
        return this.demsCollection.doc(id).update(dem);
    };
    DemserviceService.prototype.addDem = function (dem) {
        return this.demsCollection.add(dem);
    };
    DemserviceService.prototype.removeDem = function (id) {
        return this.demsCollection.doc(id).delete();
    };
    DemserviceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], DemserviceService);
    return DemserviceService;
}());
export { DemserviceService };
//# sourceMappingURL=demservice.service.js.map