import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-tab4',
	templateUrl: 'tab4.page.html',
	styleUrls: ['tab4.page.scss'],
	providers: [UserService]
})
export class Tab4Page implements OnInit {
	
	public title: string;
	public user;
	public identity;
	public token;
	public loading;
	constructor(
		private _userService: UserService,
		private alertCtrl: AlertController,
		private _route: ActivatedRoute,
		public loadCtrl: LoadingController,
		private _router: Router
		){
		this.title = 'Indentifícate';
		this.user = {
			"email":"",
			"password":"",
			"getHash": "true"
		};
	}

	/*MOSTRAR NOTIFICACION*/
	async showAlert(){
		const alert = await this.alertCtrl.create({
			header: 'MALAS NOTICIAS',
			message: 'Usuario o Contraseña Incorrectos',
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


	ngOnInit(){

		console.log('El componente login.component ha sido cargado!!');
		this.logout();
		this.redirectIfIdentity();


	}

	redirectIfIdentity(){
		let identity = this._userService.getIdentity();
		if(identity != null && identity.sub){
			this._router.navigate(["/"]);
		}
	}

	logout(){
		this._route.params.forEach((params: Params) => {
			let logout = +params['id'];
			if(logout == 1){
				localStorage.removeItem('identity');
				localStorage.removeItem('token');

				this.identity = null;
				this.token = null;

				window.location.href = '/';
			}
		});
	}

	onSubmit(){
		this.presentLoading();
		console.log(this.user);
		this._userService.signup(this.user).subscribe(
			response => {
				this.identity = response;

				if(this.identity.length <= 1){
					console.log('Error en el servidor');
				}{
					if(!this.identity.status){
						this.dismissLoading();
						localStorage.setItem('identity', JSON.stringify(this.identity));

						// GET TOKEN
						this.user.getHash = null;
						this._userService.signup(this.user).subscribe(
							response => {
								this.token = response;

								if(this.identity.length <= 1){
									console.log('Error en el servidor');
								}{
									if(!this.identity.status){
										localStorage.setItem('token', JSON.stringify(this.token));
										
										window.location.href = "/index";
									}
								}

							},
							error => {
								console.log(<any>error);
							}
							);

					}else{
						console.log('login failed');
						this.dismissLoading();
						this.showAlert();

					}

				}

			},
			error => {
				console.log(<any>error);
			}
			);
	}

}
