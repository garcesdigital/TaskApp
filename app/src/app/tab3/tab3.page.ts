import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { User } from '../models/user';
import { ActionSheetController, LoadingController, AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [UserService, TaskService]
})
export class Tab3Page implements OnInit {
  public title: string;
  public user: User;
  public status;
  public identity;
  public token;
  public loading;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController

  ) {
    this.title = 'Modificar mis datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  /*MOSTRAR PROGRESO DE CARGA*/
  private async presentLoading() {
    this.loading = await this.loadCtrl.create();
    this.loading.present();
  }

  private async dismissLoading() {
    this.loadCtrl.dismiss();
  }

  /*MOSTRAR ALERT*/
  async showAlert(title, message) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    if (this.identity == null) {
      this._router.navigate(['/login']);
    } else {
      this.user = new User(
        this.identity.sub,
        this.identity.role,
        this.identity.name,
        this.identity.surname,
        this.identity.email,
        this.identity.password
      );
    }
  }

  onSubmit() {
    console.log(this.user);
    this.presentLoading();
    this._userService.update_user(this.user).subscribe(
      response => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
          const title = 'ERROR';
          const message = 'Tenemos problemas para procesar esta solicitud';
          this.showAlert(title,message);
        } else {
          this.dismissLoading();
          localStorage.setItem('identity', JSON.stringify(this.user));
          const title = 'Buenas Noticias';
          const message = 'Cambios Guardados Satisfactoriamente';
          this.showAlert(title,message);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
