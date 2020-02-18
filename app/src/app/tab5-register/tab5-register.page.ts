import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab5-register',
  templateUrl: './tab5-register.page.html',
  styleUrls: ['./tab5-register.page.scss'],
  providers: [UserService]
})
export class Tab5RegisterPage implements OnInit{
	public title: string;
	public user: User;
  public status;
  public loading;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
    private _userService: UserService,
    public loadCtrl: LoadingController,
    private alertCtrl: AlertController
	){
		this.title = 'Registro';
		this.user = new User(1, "user", "", "", "", "");
  }
  
  /*MOSTRAR NOTIFICACION*/
	async showAlert(title,message){
		const alert = await this.alertCtrl.create({
			header: title,
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
	/*FIN MOSTRAR PROCESO DE CARGA*/

	ngOnInit(){
		console.log('El componente register.component ha sido cargado!!');
	}

	onSubmit(){
    this.presentLoading();
		console.log(this.user);
		this._userService.register(this.user).subscribe(
			response => {
				this.status = response.status;
				if(response.status != 'success'){
          this.status = 'error';
          const title = 'ERROR';
          const message = 'Tenemos problemas con su solicitud';
          this.showAlert(title,message);
				}else{
          this.dismissLoading();
          this.user = new User(1, "user", "", "", "", "");
          const title = 'Buenas Noticias';
          const message = 'Te has registrado correctamente';
          this.showAlert(title,message);
          window.location.href = '/login';
				}
			},
			error => {
				console.log(<any>error)
			}
		);
	}
}