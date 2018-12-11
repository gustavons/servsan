var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ModalController } from '@ionic/angular';
var BuscarServicoPage = /** @class */ (function () {
    function BuscarServicoPage(todoService, modal) {
        this.todoService = todoService;
        this.modal = modal;
    }
    BuscarServicoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.getTodos().subscribe(function (res) {
            _this.todos = res;
        });
    };
    BuscarServicoPage.prototype.atualizar = function () {
        var _this = this;
        this.todoService.getTodos().subscribe(function (res) {
            _this.todos = res;
        });
    };
    BuscarServicoPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.atualizar();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val.length > 0) {
            console.log("Entrou");
            console.log(this.todos[0].descricao);
            this.todos = this.todos.filter(function (v) {
                if (v.descricao && val) {
                    if (v.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                        return true;
                    }
                    return false;
                }
            });
        }
        console.log(val, this.todos.length);
    };
    ;
    BuscarServicoPage = __decorate([
        Component({
            selector: 'app-buscar-servico',
            templateUrl: './buscar-servico.page.html',
            styleUrls: ['./buscar-servico.page.scss'],
        }),
        __metadata("design:paramtypes", [TodoService, ModalController])
    ], BuscarServicoPage);
    return BuscarServicoPage;
}());
export { BuscarServicoPage };
//# sourceMappingURL=buscar-servico.page.js.map