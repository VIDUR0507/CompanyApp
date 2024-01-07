import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  SelectedRolled: any;
  companyReg: FormGroup;
  customerReg: FormGroup;
  data_get: any;
  constructor(
    private storage: DataStoreService,

    private router: Router
  ) {
    this.companyReg = new FormGroup({
      name: new FormControl('', Validators.required),
      add: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      Cpassword: new FormControl('', Validators.required),
    });
    this.customerReg = new FormGroup({
      name: new FormControl('', Validators.required),
      num: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      Cpassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
  Submit(form: any) {
    form.SelectedRolled = this.SelectedRolled;
    this.storage.getfromStorage('registered@user').then((d: any) => {
      if (d != null) {
        let arr = JSON.parse(d);
        this.data_get = arr;
        let emailExit = this.data_get.find((e: any) => e.email == form.email);
        if (emailExit) {
          // this.commonService.presentToast(
          //   'already present this email',
          //   'danger'
          // );
        } else {
          this.data_get.push(form);
          this.storage.saveIntoStorage('registered@user', this.data_get);

          // this.commonService.presentToast(
          //   'Registration Successfully',
          //   'success'
          // );
        }
      } else {
        let new_data = [];
        new_data.push(form);
        this.storage.saveIntoStorage('registered@user', new_data);
        // this.commonService.presentToast(
        //   'Registration Successfully',
        //   'success'
        // );
      }
    });
    this.companyReg.reset();
    this.customerReg.reset();
    this.router.navigate(['/login']);
  }
}
