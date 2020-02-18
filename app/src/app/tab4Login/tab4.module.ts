import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Tab4Page } from './tab4.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }])
  ],
  declarations: [Tab4Page]
})
export class LoginModule {}
