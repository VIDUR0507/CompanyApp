import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.page.html',
  styleUrls: ['./user-comment.page.scss'],
})
export class UserCommentPage implements OnInit {
  postDetails: any = [];

  Email: any;

  details: any = '';
  role: any;

  sameMailpost: any;

  timestampMilliseconds: any;
  time: any;
  Age: any;

  form: FormGroup;
  CommentShow: any = [];
  urlValue: any;

  constructor(
    private storage: DataStoreService,
    private alert: AlertService,
    private router: Router
  ) {
    this.form = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
    this.profile();
    this.urlValue = this.router.getCurrentNavigation()?.extras.queryParams;
    console.log('QuerParamData', this.urlValue);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.urlValue;
    this.showComment();
  }

  profile() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.details = el;
        this.role = this.details.role;
        this.Email = this.details.email;
        console.log('Details', this.details);
      }
    });
  }

  AddComment(data: any) {
    this.storage.getfromStorage('comment').then((el: any) => {
      if (el != null) {
        let existingComment = el;
        data.email = this.Email;
        data.commentId = this.getRandom();
        data.postId = this.urlValue.postId;
        existingComment.push(data);
        this.storage.saveIntoStorage('comment', existingComment);
        this.showComment();
      } else {
        let newComment: any = [];
        data.email = this.Email;
        data.commentId = this.getRandom();
        data.postId = this.urlValue.postId;
        newComment.push(data);
        this.storage.saveIntoStorage('comment', newComment);
        this.showComment();
      }
    });
    this.form.reset();
  }

  removeComment(data: any) {
    this.storage.getfromStorage('comment').then((el: any) => {
      if (el != null) {
        let existingdata = el;
        let index = existingdata.findIndex(
          (res: any) =>
            res.postId == data.postId &&
            res.email == this.Email &&
            res.commentId == data.commentId
        );
        console.log('Found', index);
        if (index >= 0) {
          let removed = existingdata.splice(index, 1);
          console.log('removed', removed);
          this.storage.saveIntoStorage('comment', existingdata);
          this.showComment();
        } else {
          console.log('postID does not exists');
        }
      }
    });
  }

  getRandom() {
    let num = 1000;
    return Math.floor(Math.random() * num) + 1;
  }

  showComment() {
    this.storage.getfromStorage('comment').then((el: any) => {
      if (el != null) {
        this.CommentShow = el.filter(
          (res: any) => res.postId == this.urlValue.postId
        );
      }
      console.log('Comment', this.CommentShow);
    });
  }
}
