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
var CadService = /** @class */ (function () {
    function CadService(db) {
        this.cadsCollection = db.collection('cadastro');
        this.cads = this.cadsCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    }
    CadService.prototype.getCads = function () {
        return this.cads;
    };
    CadService.prototype.getCad = function (id) {
        return this.cadsCollection.doc(id).valueChanges();
    };
    CadService.prototype.updateCad = function (cad, id) {
        return this.cadsCollection.doc(id).update(cad);
    };
    CadService.prototype.addCad = function (cad) {
        return this.cadsCollection.add(cad);
    };
    CadService.prototype.removeCad = function (id) {
        return this.cadsCollection.doc(id).delete();
    };
    CadService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], CadService);
    return CadService;
}());
export { CadService };
//# sourceMappingURL=user.service.js.map