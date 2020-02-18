import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
var Tab4Page = /** @class */ (function () {
    function Tab4Page(_userService, alertCtrl, _route, loadCtrl, _router) {
        this._userService = _userService;
        this.alertCtrl = alertCtrl;
        this._route = _route;
        this.loadCtrl = loadCtrl;
        this._router = _router;
        this.title = 'Indentifícate';
        this.user = {
            "email": "",
            "password": "",
            "getHash": "true"
        };
    }
    /*MOSTRAR NOTIFICACION*/
    Tab4Page.prototype.showAlert = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'MALAS NOTICIAS',
                            message: 'Usuario o Contraseña Incorrectos',
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
    Tab4Page.prototype.presentLoading = function () {
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
    Tab4Page.prototype.dismissLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loading.dismiss();
                return [2 /*return*/];
            });
        });
    };
    /*FIN MOSTRAR PROCESO DE CARGA*/
    Tab4Page.prototype.ngOnInit = function () {
        console.log('El componente login.component ha sido cargado!!');
        this.logout();
        this.redirectIfIdentity();
    };
    Tab4Page.prototype.redirectIfIdentity = function () {
        var identity = this._userService.getIdentity();
        if (identity != null && identity.sub) {
            this._router.navigate(["/"]);
        }
    };
    Tab4Page.prototype.logout = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var logout = +params['id'];
            if (logout == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                _this.identity = null;
                _this.token = null;
                window.location.href = '/task';
            }
        });
    };
    Tab4Page.prototype.onSubmit = function () {
        var _this = this;
        this.presentLoading();
        console.log(this.user);
        this._userService.signup(this.user).subscribe(function (response) {
            _this.identity = response;
            if (_this.identity.length <= 1) {
                console.log('Error en el servidor');
            }
            {
                if (!_this.identity.status) {
                    _this.dismissLoading();
                    localStorage.setItem('identity', JSON.stringify(_this.identity));
                    // GET TOKEN
                    _this.user.getHash = null;
                    _this._userService.signup(_this.user).subscribe(function (response) {
                        _this.token = response;
                        if (_this.identity.length <= 1) {
                            console.log('Error en el servidor');
                        }
                        {
                            if (!_this.identity.status) {
                                localStorage.setItem('token', JSON.stringify(_this.token));
                                window.location.href = "/index";
                            }
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                else {
                    console.log('login failed');
                    _this.dismissLoading();
                    _this.showAlert();
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    Tab4Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab4',
            templateUrl: 'tab4.page.html',
            styleUrls: ['tab4.page.scss'],
            providers: [UserService]
        }),
        tslib_1.__metadata("design:paramtypes", [UserService,
            AlertController,
            ActivatedRoute,
            LoadingController,
            Router])
    ], Tab4Page);
    return Tab4Page;
}());
export { Tab4Page };
//# sourceMappingURL=tab4.page.js.map