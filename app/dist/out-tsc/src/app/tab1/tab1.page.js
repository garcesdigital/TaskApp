import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { ActionSheetController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(_route, _router, _userService, _taskService, loadCtrl, alertCtrl, modalController, actionSheetController) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._taskService = _taskService;
        this.loadCtrl = loadCtrl;
        this.alertCtrl = alertCtrl;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.page = 1;
        this.filter = 0;
        this.order = 0;
        this.title = 'Homepage';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    /*MOSTRAR MODAL*/
    Tab1Page.prototype.openModal = function (id, title) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalPage,
                            componentProps: {
                                "paramData": 'Ejemplo' + id,
                                "paramTitle": title
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        // modal.onDidDismiss().then((dataReturned) => {
                        //   if (dataReturned !== null) {
                        //     console.log('Modal Sent Data :', dataReturned);
                        //   }
                        // });
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        // modal.onDidDismiss().then((dataReturned) => {
                        //   if (dataReturned !== null) {
                        //     console.log('Modal Sent Data :', dataReturned);
                        //   }
                        // });
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*MOSTRAR NOTIFICACION DE ERROR*/
    Tab1Page.prototype.showAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Error!',
                            message: 'Tenemos problemas para mostrar la informacion',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*MOSTRAR NOTIFICACION DE OK*/
    Tab1Page.prototype.showAlertSuccess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Buenas Noticias!',
                            message: 'Hemos procesado su solicitud',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*MOSTRAR PROGRESO DE CARGA*/
    Tab1Page.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadCtrl.create()];
                    case 1:
                        _a.loading = _b.sent();
                        this.loading.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.dismissLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loading.dismiss();
                return [2 /*return*/];
            });
        });
    };
    /*FIN MOSTRAR PROCESO DE CARGA*/
    /*MOSTRAR*/
    //this.presentLoading();
    /*QUITAR*/
    //this.dismissLoading();
    Tab1Page.prototype.presentActionSheet = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Opciones',
                            buttons: [{
                                    text: 'Eliminar',
                                    role: 'destructive',
                                    icon: 'trash',
                                    handler: function () {
                                        //console.log('Delete clicked '+id),
                                        _this.deleteTask(id);
                                    }
                                }, {
                                    text: 'Editar',
                                    icon: 'clipboard',
                                    handler: function () {
                                        _this.getTask(id);
                                    }
                                }, {
                                    text: 'Cancelar',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*ELIMINAR TAREAS*/
    Tab1Page.prototype.deleteTask = function (id) {
        var _this = this;
        console.log('Has dado click a borrar');
        this.presentLoading();
        this._taskService.deleteTask(this.token, id).subscribe(function (response) {
            if (response.status == 'success') {
                _this.dismissLoading();
                _this._router.navigate(['/']);
                _this.showAlertSuccess();
            }
            else {
                _this.showAlert();
            }
        }, function (error) {
            console.log(error);
        });
    };
    /*FIN ELIMINAR TAREAS*/
    Tab1Page.prototype.ngOnInit = function () {
        console.log('El componente default.component ha sido cargado!!');
        this.getAllTasks();
    };
    /*MOSTRAR UNA SOLA TAREA*/
    Tab1Page.prototype.getTask = function (id) {
        var _this = this;
        this._taskService.getTask(this.token, id).subscribe(function (response) {
            if (response.status == 'success') {
                if (response.data.user.id == _this.identity.sub) {
                    _this.task = response.data;
                    _this.loading = 'hide';
                    var title = _this.task.title;
                    _this.openModal(id, title);
                }
                else {
                    _this._router.navigate(['/']);
                }
            }
            else {
                _this._router.navigate(['/login']);
            }
        }, function (error) {
            console.log(error);
        });
    };
    /*FIN MOSTRAR UNA SOLA TAREA*/
    /*MOSTRAR TODAS LAS TAREAS*/
    Tab1Page.prototype.getAllTasks = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var page = +params['page'];
            if (!page) {
                page = 1;
            }
            _this.presentLoading();
            _this._taskService.getTasks(_this.token, page).subscribe(function (response) {
                _this.dismissLoading();
                if (response.status == 'success') {
                    _this.tasks = response.data;
                    // Total paginas
                    _this.pages = [];
                    for (var i = 0; i < response.total_pages; i++) {
                        _this.pages.push(i);
                    }
                    // Pagina anterior
                    if (page >= 2) {
                        _this.pagePrev = (page - 1);
                    }
                    else {
                        _this.pagePrev = page;
                    }
                    // Pagina siguiente
                    if (page < response.total_pages) {
                        _this.pageNext = (page + 1);
                    }
                    else {
                        _this.pageNext = page;
                    }
                }
                else {
                    _this.showAlert();
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    /*FIN MOSTRAR TODAS LAS TAREAS*/
    Tab1Page.prototype.loadData = function (event) {
        var _this = this;
        console.log('cargando controlador de scroll');
        this._route.params.forEach(function (params) {
            //let page = +params['page'];
            _this.page++;
            console.log(_this.page);
            _this._taskService.getTasks(_this.token, _this.page).subscribe(function (response) {
                if (response.status == 'success') {
                    for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                        var task = _a[_i];
                        _this.tasks.push(task);
                    }
                    event.target.complete();
                }
                else {
                    _this.showAlert();
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    Tab1Page.prototype.search = function () {
        var _this = this;
        console.log(this.filter);
        console.log(this.order);
        console.log(this.searchString);
        this.presentLoading();
        if (!this.searchString || this.searchString.trim().length == 0) {
            this.searchString = null;
        }
        this._taskService.search(this.token, this.searchString, this.filter, this.order).subscribe(function (response) {
            _this.dismissLoading();
            if (response.status == 'success') {
                _this.tasks = response.data;
            }
            else {
                _this._router.navigate(['/index']);
            }
        }, function (error) {
            console.log(error);
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss'],
            providers: [UserService, TaskService]
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            UserService,
            TaskService,
            LoadingController,
            AlertController,
            ModalController,
            ActionSheetController])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map