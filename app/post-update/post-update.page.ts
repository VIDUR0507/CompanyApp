import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from '../service/data-store.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.page.html',
  styleUrls: ['./post-update.page.scss'],
})
export class PostUpdatePage implements OnInit {
  form: FormGroup;
  formArrayID: any;
  Categoryvalue: any;
  urlValue: any;

  imageUrl: any;
  Email: any;

  cats: any = [
    { label: 'AI', selected: false },
    { label: 'ML', selected: false },
    { label: 'NLP', selected: false },
    { label: 'Deep Learning', selected: false },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage: DataStoreService
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      categoryArray: this.fb.array([this.categoryArrayfields()]),
    });
    this.urlValue = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('QuerYparam', this.urlValue);
  }

  ngOnInit() {
    this.filldata();
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.Email = el.email;
        console.log('Email', this.Email);
      }
    });
  }

  categoryArrayfields() {
    return this.fb.group({
      category: new FormControl('', Validators.required),
    });
  }

  addCategory(index: any) {
    index = this.categoryLength;
    console.log('index', index);
    if (index < 4) {
      let control = this.categoryArrayfields();
      (<FormArray>this.form.get('categoryArray')).push(control);
    } else {
      console.log('categoryArray cannot be added');
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
      console.log('i:', i);
      if (i > -1) {
        this.cats[i].selected = false;
      }
    }
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

  get categoryControls() {
    return (<FormArray>this.form.get('categoryArray')).controls;
  }

  get categoryLength() {
    return (<FormArray>this.form.get('categoryArray')).length;
  }

  filldata() {
    this.storage.getfromStorage('post').then((el: any) => {
      if (el != null) {
        let postData = el;
        let index = postData.filter(
          (res: any) => res.postId === this.urlValue.postId
        );
        console.log('index', index);
        if (index.length > 0) {
          console.log('patch');
          let patchdata = index[0];
          this.imageUrl = patchdata.image;
          this.form.patchValue(patchdata);

          const categoryArray = <FormArray>this.form.get('categoryArray');
          categoryArray.clear();

          patchdata.categoryArray.forEach((item: any) => {
            console.log('PricingArrayControls', item);
            categoryArray.push(this.fb.group(item));
          });

          console.log('patch', patchdata);
          console.log('formArray', patchdata.categoryArray);
        }
      }
    });
  }

  UpdatePost() {
    this.storage.getfromStorage('post').then((el: any) => {
      if (el != null) {
        let postData = el;
        let index = postData.findIndex(
          (res: any) => res.postId === this.urlValue.postId
        );
        console.log('index', index);
        console.log('len', index.length);
        if (index != -1) {
          postData[index] = this.form.value;
          postData[index].image = this.imageUrl;
          postData[index].email = this.Email;
          console.log('updatedata', postData[index]);
          this.storage.saveIntoStorage('post', postData);
        }
      }
      this.router.navigate(['/tabs/tab1']);
    });
  }

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
}
