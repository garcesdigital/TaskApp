import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
var ModalPage = /** @class */ (function () {
    function ModalPage(modalController, navParams) {
        this.modalController = modalController;
        this.navParams = navParams;
    }
    ModalPage.prototype.ngOnInit = function () {
        console.table(this.navParams);
        this.modelId = this.navParams.data.paramTitle;
        this.modalTitle = this.navParams.data.paramID;
    };
    ModalPage.prototype.closeModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onClosedData;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onClosedData = "Wrapped Up!";
                        return [4 /*yield*/, this.modalController.dismiss(onClosedData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal',
            templateUrl: './modal.page.html',
            styleUrls: ['./modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            NavParams])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.page.js.map