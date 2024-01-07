import { Component } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { BehaviourService } from '../service/behaviour.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  details: any;
  role: any;
  constructor(
    private storage: DataStoreService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private update: BehaviourService
  ) {
    this.profile();
  }

  ionViewWillEnter() {
    this.profile();
  }

  profile() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.details = el;
        this.role = this.details.role;
      }
    });
  }

  async presentActionSheet(data: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          role: 'selected',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: data,
            };
            // this.router.navigate(['/update-user'], navigationExtras);
            this.router.navigate(['/tabs/tab4'], navigationExtras);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {},
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
