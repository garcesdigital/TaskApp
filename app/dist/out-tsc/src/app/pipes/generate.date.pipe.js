import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var GenerateDatePipe = /** @class */ (function () {
    function GenerateDatePipe() {
    }
    GenerateDatePipe.prototype.transform = function (value) {
        var date = new Date(value * 1000);
        var day = date.getDate();
        var final_day = day.toString();
        if (day <= 9) {
            final_day = '0' + day;
        }
        var month = (date.getMonth() + 1);
        var final_month = month.toString();
        if (month <= 9) {
            final_month = '0' + month;
        }
        var result = final_day + '/' + final_month + '/' + date.getFullYear();
        return result;
    };
    GenerateDatePipe = tslib_1.__decorate([
        Pipe({ name: 'generateDate' })
    ], GenerateDatePipe);
    return GenerateDatePipe;
}());
export { GenerateDatePipe };
//# sourceMappingURL=generate.date.pipe.js.map