import { ModalPage } from './../modal/modal.page';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { ActionSheetController, LoadingController, AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
import { GenerateDatePipe } from '../pipes/generate.date.pipe';
@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
	providers: [UserService, TaskService]
})
export class Tab1Page implements OnInit {
	public title: string;
	public identity;
	public token;
	public tasks: Array<Task>;
	public task: Task;
	public status_task;
	public page = 1;
	public pages;
	public pagePrev;
	public pageNext;
	public loading;
	public tnuevas: number;
	public tporhacer: number;
	public tacabadas: number;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _taskService: TaskService,
		public loadCtrl: LoadingController,
		public alertCtrl: AlertController,
		public modalController: ModalController,
		public navController: NavController,
		public actionSheetController: ActionSheetController
	) {
		this.title = 'Lista de Tareas';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	async openModal(id) {
		const modal = await this.modalController.create({
			component: ModalPage,
			componentProps: { value: this.task }
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		const idTask = data.data.id;
		const ObTask = data.data;
		console.log(idTask);
		console.log(ObTask);
		this.updateTask(ObTask, idTask);

	}


	updateTask(ObTask, idTask) {
		//console.log(this.data);
		//console.log(this.data.id);
		this._taskService.update(this.token, ObTask, idTask).subscribe(

			response => {
				this.status_task = response.status;

				if (this.status_task != 'success') {
					this.status_task = 'error';
				} else {
					//this.data = response.data;
					//this._router.navigate(['/task', this.task.id]);
					this.ngOnInit();
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}



	/*MOSTRAR UNA SOLA TAREA*/
	getTask(id) {
		this._taskService.getTask(this.token, id).subscribe(
			response => {
				if (response.status == 'success') {

					if (response.data.user.id == this.identity.sub) {
						this.task = response.data;
						this.openModal(id);
					} else {
						this._router.navigate(['/']);
					}

				} else {
					this._router.navigate(['/login']);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	/*FIN MOSTRAR UNA SOLA TAREA*/


	/*MOSTRAR NOTIFICACION DE ERROR*/
	async showAlert(title, message) {
		const alert = await this.alertCtrl.create({
			header: title,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}

	/*MOSTRAR NOTIFICACION DE OK*/
	async showAlertSuccess() {
		const alert = await this.alertCtrl.create({
			header: 'Buenas Noticias!',
			message: 'Hemos procesado su solicitud',
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
	/*FIN MOSTRAR PROCESO DE CARGA*/

	/*MOSTRAR*/
	//this.presentLoading();
	/*QUITAR*/
	//this.dismissLoading();


	async presentActionSheet(id) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Opciones',
			buttons: [{
				text: 'Eliminar',
				role: 'destructive',
				icon: 'trash',
				handler: () => {
					//console.log('Delete clicked '+id),
					this.deleteTask(id);
				}
			}, {
				text: 'Editar',
				icon: 'clipboard',
				handler: () => {
					this.getTask(id);
				}
			}, {
				text: 'Cancelar',
				icon: 'close',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]
		});
		await actionSheet.present();
	}


	/*ELIMINAR TAREAS*/

	deleteTask(id) {
		console.log('Has dado click a borrar');
		this._taskService.deleteTask(this.token, id).subscribe(
			response => {
				if (response.status == 'success') {
					this.ngOnInit();
				} else {
					const title = 'Error';
					const message = 'Tenemos problemas para mostrar la informacion';
					this.showAlert(title, message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
	/*FIN ELIMINAR TAREAS*/

	ngOnInit() {
		if (this.identity == null) {
			this._router.navigate(['/login']);
		} else {
			console.log('El componente default.component ha sido cargado!!');
			this.getAllTasks();
			//this.getItemsCount();
		}

	}

	/*CONTAR RESULTADOS */
	getItemsCount() {
		//contar tareas nuevas



	}



	/*MOSTRAR TODAS LAS TAREAS*/
	getAllTasks() {
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];

			if (!page) {
				page = 1;
			}

			//this.presentLoading();
			this._taskService.getTasks(this.token, this.page).subscribe(
				response => {
					//this.dismissLoading();
					if (response.status == 'success') {
						this.tasks = response.data;

						this.tnuevas = 0;
							this.tporhacer = 0;
							this.tacabadas = 0;
						for (let datanew of this.tasks) {

							
							if (datanew.status == 'new') {
								this.tnuevas++;

							}
							if (datanew.status == 'todo') {
								this.tporhacer++;

							}
							if (datanew.status == 'finished') {
								this.tacabadas++;

							}
						}




						// Total paginas
						this.pages = [];
						for (let i = 0; i < response.total_pages; i++) {
							this.pages.push(i);
						}

						// Pagina anterior
						if (page >= 2) {
							this.pagePrev = (page - 1);
						} else {
							this.pagePrev = page;
						}

						// Pagina siguiente
						if (page < response.total_pages) {
							this.pageNext = (page + 1);
						} else {
							this.pageNext = page;
						}

					} else {
						const title = 'Error';
						const message = 'Tenemos problemas para mostrar la informacion';
						this.showAlert(title, message);
					}
				},
				error => {
					console.log(<any>error);
				}
			);

		});
	}
	/*FIN MOSTRAR TODAS LAS TAREAS*/

	loadData(event) {

		console.log('cargando controlador de scroll');
		this._route.params.forEach((params: Params) => {
			//let page = +params['page'];
			this.page++;
			console.log(this.page);

			this._taskService.getTasks(this.token, this.page).subscribe(
				response => {

					if (response.status == 'success') {

						for (const task of response.data) {
							this.tasks.push(task);

						}
						event.target.complete();
					} else {
						const title = 'Error';
						const message = 'Tenemos problemas para mostrar la informacion';
						this.showAlert(title, message);
					}
				},
				error => {
					console.log(<any>error);
				}
			);

		});
	}

	public filter = 0;
	public order = 0;
	public searchString;

	search() {
		console.log(this.filter);
		console.log(this.order);
		console.log(this.searchString);
		//this.presentLoading();
		if (!this.searchString || this.searchString.trim().length == 0) {
			this.searchString = null;
		}

		this._taskService.search(this.token, this.searchString, this.filter, this.order).subscribe(
			response => {
				//this.dismissLoading();
				if (response.status == 'success') {
					this.tasks = response.data;
				} else {
					const title = 'Error';
					const message = 'Tenemos problemas para mostrar la informacion';
					this.showAlert(title, message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}