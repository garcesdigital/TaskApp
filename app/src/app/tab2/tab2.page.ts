import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {TaskService} from '../services/task.service';
import {Task} from '../models/task';
import { ActionSheetController, LoadingController, AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
	providers: [UserService, TaskService]
})
export class Tab2Page implements OnInit{
	public page_title: string;
	public identity;
	public token;
	public task: Task;
	public status_task;
	public loading;

	constructor(
		private _userService: UserService,
		private _taskService: TaskService,
		private _route: ActivatedRoute,
    private _router: Router,
    public loadCtrl: LoadingController,
		public alertCtrl: AlertController
	){
		this.page_title = 'Crear nueva tarea';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
  }
  
  /*MOSTRAR NOTIFICACION DE ERROR*/
	async showAlert(titlem, message) {
		const alert = await this.alertCtrl.create({
			header: titlem,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
  }
  
  /*MOSTRAR PROGRESO DE CARGA*/
	private async presentLoading() {
		this.loading = await this.loadCtrl.create();
		this.loading.present();
	}

	private async dismissLoading() {
		this.loadCtrl.dismiss();
	}

	ngOnInit(){
		if(this.identity == null && !this.identity.sub){
			this._router.navigate(['/login']);
		}else{
			this.task = new Task(1,'', '', 'new', 'null', 'null');
		}
	}

	onSubmit(){
    //this.presentLoading();
		console.log(this.task);
		this._taskService.create(this.token, this.task).subscribe(
			response => {
				this.status_task = response.status;

				if(this.status_task != 'success'){
					this.status_task = 'error';
          this.dismissLoading();
          const titlem = 'ERROR';
          const message = 'Hemos tenido algunos problemas con la tarea';
          this.showAlert(titlem,message);
				}else{
          //this.dismissLoading();
					this.task = response.data;
          const titlem = 'Buenas Noticias';
          const message = 'Hemos guardado tu tarea';
					//this.showAlert(titlem,message);
					//console.log(this.task);
					//this._router.navigate(['/task', this.task.id]);
					//this._router.navigate(['/']);
					window.location.href = '/index';
				}
			},
			error => {
				console.log(<any>error);
			}
		);

	}

}