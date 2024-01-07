import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { format, parseISO } from 'date-fns';

import { NavigationExtras, Router } from '@angular/router';
import { DataStoreService } from '../data-store.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private storage: DataStoreService,
    private alert: AlertService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required])),

      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.form.reset();
  }

  login() {
    this.storage.getfromStorage('user').then((el: any) => {
      if (el != null) {
        let Data = el;
        let emailValue = this.form.get('email')?.value;
        let passwordValue = this.form.get('password')?.value;
        let arr = Data.filter(
          (res: any) => res.email == emailValue && res.password == passwordValue
        );
        if (arr.length > 0) {
          this.storage.saveIntoStorage('login@user', arr[0]);
          console.log('Loginarray', arr);
          this.router.navigate(['/tabs/tab1']);
        } else {
          this.alert.presentAlert('credentials do not match');
        }
      }
    });
  }

  // loginCustomer() {
  //   this.storage.getfromStorage('customer').then((el: any) => {
  //     if (el != null) {
  //       let CompanyData = el;
  //       let emailValue = this.form.get('email')?.value;
  //       let passwordValue = this.form.get('password')?.value;
  //       let arr = CompanyData.filter(
  //         (res: any) => res.email == emailValue && res.password == passwordValue
  //       );
  //       if (arr.length > 0) {
  //         this.storage.saveIntoStorage('Customer@user', arr);
  //         this.router.navigate(['/tabs/tab1']);
  //       } else {
  //         this.alert.presentAlert('credentials do not match');
  //       }
  //     }
  //   });
  // }
}
