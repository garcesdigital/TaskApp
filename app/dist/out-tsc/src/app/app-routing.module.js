import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'index', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './tab4Login/tab4.module#LoginModule' },
    { path: 'login/:id', loadChildren: './tab4Login/tab4.module#LoginModule' },
    { path: '**', loadChildren: './tab4Login/tab4.module#LoginModule' },
    { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map