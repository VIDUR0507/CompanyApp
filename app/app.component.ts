import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataStoreService } from './data-store.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private alertCtrl: AlertController,
    private storage: DataStoreService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('still login');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.storage.removefromStorage('login@user');
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });
    await alert.present();
  }
}
