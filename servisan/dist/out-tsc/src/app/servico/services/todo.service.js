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
var TodoService = /** @class */ (function () {
    function TodoService(db) {
        this.todosCollection = db.collection('servico');
        this.todos = this.todosCollection.snapshotChanges().pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    }
    TodoService.prototype.getTodos = function () {
        return this.todos;
    };
    TodoService.prototype.getTodo = function (id) {
        return this.todosCollection.doc(id).valueChanges();
    };
    TodoService.prototype.updateTodo = function (todo, id) {
        return this.todosCollection.doc(id).update(todo);
    };
    TodoService.prototype.addTodo = function (todo) {
        return this.todosCollection.add(todo);
    };
    TodoService.prototype.removeTodo = function (id) {
        return this.todosCollection.doc(id).delete();
    };
    TodoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore])
    ], TodoService);
    return TodoService;
}());
export { TodoService };
//# sourceMappingURL=todo.service.js.map