import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'index', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './tab4Login/tab4.module#LoginModule' },
  { path: 'login/:id', loadChildren: './tab4Login/tab4.module#LoginModule' },
  //{ path:'**', loadChildren: './tab4Login/tab4.module#LoginModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'register', loadChildren: './tab5-register/tab5-register.module#Tab5RegisterPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
