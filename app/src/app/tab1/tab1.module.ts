import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HttpModule } from '@angular/http';
import { GenerateDatePipe } from '../pipes/generate.date.pipe';

@NgModule({
  entryComponents:[
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpModule,
    
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page,GenerateDatePipe]
})
export class Tab1PageModule {}
