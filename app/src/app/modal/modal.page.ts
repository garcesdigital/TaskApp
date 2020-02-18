import { Component, OnInit,Input } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  providers: [TaskService]
})
export class ModalPage implements OnInit {
  public value: any ;
  public status_task;
  constructor(
    private modalCtrl : ModalController,
    ) { }


  ngOnInit() {
  }

  async closeModal(){
    this.modalCtrl.dismiss();
   }

   onSubmit(){
     //console.log(this.value);
    this.modalCtrl.dismiss({
      'data' : this.value
    });
    
   }

}
