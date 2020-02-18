import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    UserService.prototype.signup = function (user_to_login) {
        var json = JSON.stringify(user_to_login);
        var params = "json=" + json;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/login', params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = JSON.parse(localStorage.getItem('token'));
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService.prototype.register = function (user_to_register) {
        var json = JSON.stringify(user_to_register);
        var params = "json=" + json;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/user/new', params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    UserService.prototype.update_user = function (user_to_update) {
        var json = JSON.stringify(user_to_update);
        var params = "json=" + json + '&authorization=' + this.getToken();
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/user/edit', params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map