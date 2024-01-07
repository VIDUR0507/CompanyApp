import { Component } from '@angular/core';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// import * as $ from 'jquery';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  form: FormGroup;

  imageUrl: any = [];
  Email: any;
  num: any = 1000;

  role: any;
  Categoryvalue: any;

  formArrayID: any;
  cats: any = [
    { label: 'AI', selected: false },
    { label: 'ML', selected: false },
    { label: 'NLP', selected: false },
    { label: 'Deep Learning', selected: false },
  ];
  constructor(
    private storage: DataStoreService,
    private router: Router,
    private alert: AlertService,
    private formbuilder: FormBuilder
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      categoryArray: this.formbuilder.array([this.categoryArrayfields()]),
    });
  }

  ionViewWillEnter() {
    this.profile();
    this.form.reset();
    this.resetCats();
    this.imageUrl = [];
  }

  resetCats() {
    this.cats.forEach((item: any) => {
      item.selected = false;
    });
  }

  categoryArrayfields() {
    return this.formbuilder.group({
      category: new FormControl('', Validators.required),
    });
  }

  get categoryControls() {
    return (<FormArray>this.form.get('categoryArray')).controls;
  }

  get categoryArrayLength() {
    return (<FormArray>this.form.get('categoryArray')).length;
  }

  updateList(event: any) {
    console.log('event:', event.target.value);
    this.Categoryvalue = event.target.value;

    let index = this.cats.findIndex(
      (ele: any) => ele.label == event.target.value
    );
    if (index > -1) {
      this.cats[index].selected = this.cats[index].selected ? false : true;
    }
  }

  removeCategory(index: any) {
    console.log('removeCategory', index);
    if (index >= 0) {
      let values: any = <FormArray>this.form.get('categoryArray')?.value;
      let currentVal = values[index];
      (<FormArray>this.form.get('categoryArray')).removeAt(index);
      let i = this.cats.findIndex(
        (ele: any) => ele.label == currentVal.category
      );
      console.log('index:', i);
      if (i > -1) {
        this.cats[i].selected = false;
      }
    }
  }

  addCategory(index: any) {
    index = this.categoryArrayLength;
    console.log('>>>', index);
    if (index < 4) {
      let control = this.categoryArrayfields();
      (<FormArray>this.form.get('categoryArray')).push(control);
    } else {
      console.log('categoryArray cannot be added');
    }
  }

  profile() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        let details = el;
        this.role = details.role;
        this.Email = details.email;
      }
    });
  }

  onSubmit(data: any) {
    this.storage.getfromStorage('post').then((element: any) => {
      if (element != null) {
        let existingPost = element;
        data.email = this.Email;

        data.postId = this.getRandom();
        data.image = this.imageUrl;
        let like = 0;
        let dislike = 0;
        data.like = like;
        data.dislike = dislike;

        existingPost.push(data);
        this.storage.saveIntoStorage('post', existingPost);
        console.log(existingPost);
        this.router.navigate(['/tabs/tab1']);
      } else {
        let newPost: any = [];

        data.email = this.Email;
        data.postId = this.getRandom();
        data.image = this.imageUrl;
        let like = 0;
        let dislike = 0;
        data.like = like;
        data.dislike = dislike;

        newPost.push(data);
        this.storage.saveIntoStorage('post', newPost);
        console.log(newPost);
        this.router.navigate(['/tabs/tab1']);
      }
      this.form.reset();
    });
  }

  // setImage(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];

  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.imageUrl = event.target.result;
  //     };

  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  Image(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        console.log('File', file);
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl.push(event.target.result);
          console.log('ImageUrl', this.imageUrl);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // upload() {
  //   $(#imgg).trigger('click');
  // }

  getRandom() {
    return Math.floor(Math.random() * this.num) + 1;
  }
}
