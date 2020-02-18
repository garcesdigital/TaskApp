import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
var TaskService = /** @class */ (function () {
    function TaskService(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    TaskService.prototype.create = function (token, task) {
        var json = JSON.stringify(task);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/task/new', params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService.prototype.getTasks = function (token, page) {
        if (page === void 0) { page = null; }
        var params = "authorization=" + token;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        if (page == null) {
            page = 1;
        }
        return this._http.post(this.url + '/task/list?page=' + page, params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService.prototype.getTask = function (token, id) {
        var params = "authorization=" + token;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/task/detail/' + id, params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService.prototype.update = function (token, task, id) {
        var json = JSON.stringify(task);
        var params = "json=" + json + "&authorization=" + token;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/task/edit/' + id, params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService.prototype.search = function (token, search, filter, order) {
        if (search === void 0) { search = null; }
        if (filter === void 0) { filter = null; }
        if (order === void 0) { order = null; }
        var params = "authorization=" + token + "&filter=" + filter + "&order=" + order;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var url;
        if (search == null) {
            url = this.url + '/task/search';
        }
        else {
            url = this.url + '/task/search/' + search;
        }
        return this._http.post(url, params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService.prototype.deleteTask = function (token, id) {
        var params = "authorization=" + token;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this._http.post(this.url + '/task/remove/' + id, params, { headers: headers })
            .pipe(map(function (res) { return res.json(); }));
    };
    TaskService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], TaskService);
    return TaskService;
}());
export { TaskService };
//# sourceMappingURL=task.service.js.map