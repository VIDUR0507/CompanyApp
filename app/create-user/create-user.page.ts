import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  segment: string = 'company';

  ImageUrl: any;
  dob: any = '';

  form: FormGroup;
  form2: FormGroup;

  constructor(
    private storage: DataStoreService,
    private router: Router,
    private alert: AlertService
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
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {}

  CompanypasswordMatch() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('Confirmpassword')?.value;
    if (password == confirmPassword) {
      return false; // false if there is no validation error
    } else {
      return true; // true if there is  validation error
    }
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

  formatDate(value: any) {
    // return format(parseISO(value), 'MMM d, yyyy');
    return format(parseISO(value), 'MM/dd/yyyy');
  }

  CustomerpasswordMatch() {
    const password = this.form2.get('password')?.value;
    const confirmPassword = this.form2.get('Confirmpassword')?.value;
    if (password == confirmPassword) {
      return false; // false if there is no validation error
    } else {
      return true; // true if there is  validation error
    }
  }

  onRoleChange(event: any) {
    const selectedRole = event.detail.value;
    console.log('Role', selectedRole);
  }

  submitUserData(data: any, role: string) {
    if (role == 'company') {
      this.storage.getfromStorage('user').then((el: any) => {
        if (el != null) {
          let existingCustomer = el;
          let emailValue = this.form.get('email')?.value;
          console.log(emailValue);
          let index = existingCustomer.findIndex(
            (res: any) => emailValue === res.email
          );
          console.log(index);
          if (index != -1) {
            this.alert.presentAlert('Email already Exists');
          } else {
            data.role = role;
            existingCustomer.push(data);
            this.storage.saveIntoStorage('user', existingCustomer);
            this.router.navigate(['/login']);
            this.alert.presentAlert('Successful Signup');
          }
        } else {
          let newCustomer: any = [];
          newCustomer.push(data);
          data.role = role;
          this.storage.saveIntoStorage('user', newCustomer);
          this.router.navigate(['/login']);
          this.alert.presentAlert('Successful Signup');
        }
      });
    } else if (role == 'customer') {
      this.storage.getfromStorage('user').then((el: any) => {
        if (el != null) {
          let existingCustomer = el;
          let emailValue = this.form2.get('email')?.value;
          console.log('>>>', emailValue);
          let index = existingCustomer.findIndex(
            (res: any) => emailValue == res.email
          );
          if (index != -1) {
            this.alert.presentAlert('Email already Exists');
          } else {
            data.role = role;
            existingCustomer.push(data);
            this.storage.saveIntoStorage('user', existingCustomer);
            this.router.navigate(['/login']);
            this.alert.presentAlert('Successful Signup');
          }
        } else {
          let newCustomer: any = [];
          data.role = role;
          newCustomer.push(data);
          this.storage.saveIntoStorage('user', newCustomer);
          this.router.navigate(['/login']);
          this.alert.presentAlert('Successful Signup');
        }
      });
      this.form.reset();
      this.form2.reset();
    }
  }
}
