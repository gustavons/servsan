var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TodoService } from './../servico/services/todo.service';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
var HomePage = /** @class */ (function () {
    function HomePage(todoService, modal) {
        this.todoService = todoService;
        this.modal = modal;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.getTodos().subscribe(function (res) {
            _this.todos = res;
        });
    };
    // editar(id){
    //   this.modal.create(AlterarServicoPage, {id: item.id}).present();
    // }
    HomePage.prototype.remove = function (item) {
        this.todoService.removeTodo(item.id);
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [TodoService, ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map