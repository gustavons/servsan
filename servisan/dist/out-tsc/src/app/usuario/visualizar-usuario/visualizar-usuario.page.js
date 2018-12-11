var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CadService } from './../services/user.service';
import { Component } from '@angular/core';
var VisualizarUsuarioPage = /** @class */ (function () {
    function VisualizarUsuarioPage(userService) {
        this.userService = userService;
    }
    VisualizarUsuarioPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCads().subscribe(function (res) {
            _this.usuarios = res;
        });
    };
    // editar(id){
    //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
    // }
    VisualizarUsuarioPage.prototype.remove = function (item) {
        this.userService.removeCad(item.id);
    };
    VisualizarUsuarioPage = __decorate([
        Component({
            selector: 'app-visualizar-usuario',
            templateUrl: './visualizar-usuario.page.html',
            styleUrls: ['./visualizar-usuario.page.scss'],
        }),
        __metadata("design:paramtypes", [CadService])
    ], VisualizarUsuarioPage);
    return VisualizarUsuarioPage;
}());
export { VisualizarUsuarioPage };
//# sourceMappingURL=visualizar-usuario.page.js.map