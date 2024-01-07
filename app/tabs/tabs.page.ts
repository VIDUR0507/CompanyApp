import { Component } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  details: any = [];
  role: any;

  Email: any;
  urlValue: any;

  constructor(private storage: DataStoreService, private router: Router) {
    this.profile();
  }

  ionViewWillEnter() {
    this.profile();
  }

  profile() {
    console.log('hello');
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.details = el;
        this.role = this.details.role;
        console.log('Details', this.details);
      }
    });
  }
}
