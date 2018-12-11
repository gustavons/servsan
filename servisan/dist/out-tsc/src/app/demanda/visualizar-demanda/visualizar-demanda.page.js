var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DemserviceService } from './../services/demservice.service';
import { Component } from '@angular/core';
var VisualizarDemandaPage = /** @class */ (function () {
    function VisualizarDemandaPage(DemserviceService) {
        this.DemserviceService = DemserviceService;
    }
    VisualizarDemandaPage.prototype.ngOnInit = function () {
        var _this = this;
        this.DemserviceService.getDems().subscribe(function (res) {
            _this.demandas = res;
        });
    };
    // editar(id){
    //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
    // }
    VisualizarDemandaPage.prototype.remove = function (item) {
        this.DemserviceService.removeDem(item.id);
    };
    VisualizarDemandaPage = __decorate([
        Component({
            selector: 'app-visualizar-demanda',
            templateUrl: './visualizar-demanda.page.html',
            styleUrls: ['./visualizar-demanda.page.scss'],
        }),
        __metadata("design:paramtypes", [DemserviceService])
    ], VisualizarDemandaPage);
    return VisualizarDemandaPage;
}());
export { VisualizarDemandaPage };
//# sourceMappingURL=visualizar-demanda.page.js.map