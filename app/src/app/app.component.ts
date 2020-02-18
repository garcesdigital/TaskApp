import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM, NotificationData } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(
        (token: string) => {
          console.log("Este es el token para este dispositivo " + token);
          
        }
      ).catch(error => {
        console.log(error);
      });

      this.fcm.onTokenRefresh().subscribe((token: string) => {
        console.log("Se actualizó el token " + token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          //ocurre cuando el app se encuentra en segundo plano
          console.log('estamos en segundo plano' + JSON.stringify(data))
        } else {
          //ocurre cuando el app se encuentra en primer plano
          console.log('estamos en primer plano' + JSON.stringify(data))
        }
      }), error => {
        console.log("Se actualizó el token " + error);
      }


    });
  }
}
