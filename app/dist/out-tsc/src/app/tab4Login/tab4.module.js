import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Tab4Page } from './tab4.page';
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                HttpModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: Tab4Page }])
            ],
            declarations: [Tab4Page]
        })
    ], LoginModule);
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=tab4.module.js.map