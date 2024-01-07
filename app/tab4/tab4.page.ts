import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { AlertService } from '../alert.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  form: FormGroup;
  form2: FormGroup;

  ImageUrl: any;
  dob: any = '';

  urlValue: any;
  Userrole: any;

  constructor(
    private storage: DataStoreService,
    private router: Router,
    private alert: AlertService,
    private toastCtrl: ToastController
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      bio: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      contact: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      Confirmpassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      role: new FormControl('', Validators.compose([Validators.required])),
    });

    this.form2 = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      contact: new FormControl('', Validators.compose([Validators.required])),
      DOB: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      Confirmpassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      role: new FormControl('', Validators.compose([Validators.required])),
    });

    this.urlValue = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('urlValue', this.urlValue);
    this.Userrole = this.urlValue.role;
    this.filldata();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.filldata();
  }

  formatDate(value: any) {
    return format(parseISO(value), 'MM/dd/yyyy');
  }

  setlogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.ImageUrl = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  filldata() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        const existedData = el;
        console.log('Data', existedData);
        if (this.Userrole == 'company') {
          this.form.patchValue(existedData);
        } else if (this.Userrole == 'customer') {
          this.form2.patchValue(existedData);
        }
        // this.form.get('name')?.setValue('name');
      }
    });
  }

  UpdateUserData(role: any) {
    if (role == 'company') {
      console.log(this.form.value);
      this.storage.saveIntoStorage('login@user', this.form.value);
      this.storage.getfromStorage('user').then((el: any) => {
        if (el != null) {
          let existingData = el;
          let index = existingData.findIndex(
            (res: any) => this.urlValue.email == res.email
          );
          console.log('index', index);
          if (index != -1) {
            existingData[index] = this.form.value;
            console.log('UpdatedData', existingData[index]);
            this.storage.saveIntoStorage('user', existingData);
            this.presentToast('bottom', 'successfulUpdate');
          }
        }
      });
      // this.router.navigate(['/tabs/tab3']);
    } else if (role == 'customer') {
      console.log(this.form2.value);
      this.storage.saveIntoStorage('login@user', this.form2.value);
      this.storage.getfromStorage('user').then((el: any) => {
        if (el != null) {
          let existingData = el;
          let index = existingData.findIndex(
            (res: any) => this.urlValue.email == res.email
          );
          console.log('index', index);
          if (index != -1) {
            existingData[index] = this.form2.value;
            console.log('UpdatedData', existingData[index]);
            this.storage.saveIntoStorage('user', existingData);
            this.presentToast('bottom', 'successfulUpdate');
          }
        }
      });
    }
    this.router.navigate(['/tabs/tab3']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
