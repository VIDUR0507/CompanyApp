import { Component, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataStoreService } from '../data-store.service';
import { AlertService } from '../alert.service';
import { ActionSheetController, MenuController } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  postDetails: any = [];

  isLiked: { [postId: string]: boolean } = {};

  count: any = 0;
  totalLikes: any = 0;

  Dob: any;
  todayDate: any;

  details: any = {};

  sameMailpost: any;
  filterItem: any;

  timestampMilliseconds: any;
  time: any;
  Age: any;

  slideOpts = {
    initialSlide: 1,
    autoplay: true,
  };

  constructor(
    private storage: DataStoreService,
    private alert: AlertService,
    private router: Router,
    private menuctrl: MenuController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.profile();
    this.getTime();
    this.userBirthdate();
  }

  profile() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.details = el;
        console.log('Details', this.details);
        this.postData();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  postData() {
    this.storage.getfromStorage('post').then((el: any) => {
      if (el != null) {
        this.postDetails = el;
        if (this.details.role == 'company') {
          this.sameMailpost = this.postDetails.filter(
            (res: any) => res.email == this.details.email
          );
          console.log('SameMailPost', this.sameMailpost);
        }
      }
    });
  }

  userBirthdate() {
    this.storage.getfromStorage('login@user').then((el: any) => {
      if (el != null) {
        this.details = el;
        this.Dob = this.details.DOB;
        console.log('birthday', this.Dob);
        this.timestampMilliseconds = new Date(this.Dob).getTime();
        console.log('timestampMilliseconds', this.timestampMilliseconds);
        let millisecondsdifference = this.time - this.timestampMilliseconds;
        console.log('milliseconds', millisecondsdifference);

        this.Age = this.millisecondsToYears(millisecondsdifference);
        // this.Age = (years / 365.25) * 24 * 60 * 60 * 1000;
        console.log(this.Age, 'age');
      }
    });
  }

  millisecondsToYears(milliseconds: number): number {
    const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
    const years = milliseconds / millisecondsInYear;
    return years;
  }

  togglemenu() {
    this.menuctrl.toggle();
    console.log('Menu open');
  }

  getTime() {
    let today: any = new Date();
    console.log('CurrentDate & Time', today);
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();
    console.log('dd', dd, 'mm', mm, 'yyyy', yyyy);

    this.todayDate = mm + '/' + dd + '/' + yyyy;
    this.time = today.getTime();
    console.log('Date', this.todayDate);
    console.log('Time', this.time);
  }

  sendData(data: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: data,
    };
    this.router.navigate(['/user-comment'], navigationExtras);
    console.log(data);
  }

  likePost(data: any, type: any) {
    const index = this.postDetails.findIndex(
      (res: any) => res.postId === data.postId
    );
    if (index !== -1) {
      const post = this.postDetails[index];
      if (type === 'like') {
        post.like++;
        if (post.dislike > 0) {
          post.dislike--;
        }
      } else if (type === 'dislike' && post.like > 0) {
        post.dislike++;
        post.like--;
      }
      this.storage.saveIntoStorage('post', this.postDetails);
    }
  }

  likeDislike(data: any) {
    if (this.Age >= 20) {
      this.storage.getfromStorage('postLike').then((el: any) => {
        if (el != null) {
          if (el.hasOwnProperty(data.postId)) {
            console.log('Key exists');
            let arrayToAccess = el[data.postId];
            console.log(arrayToAccess);
            if (Array.isArray(arrayToAccess)) {
              let index = arrayToAccess.findIndex(
                (value) => value === this.details.email
              );
              console.log(`Index of '${this.details.email}': ${index}`);
              if (index != -1) {
                //for same postID
                console.log(`Index of '${this.details.email}': ${index}`);
                let removed = arrayToAccess.splice(index, 1);
                console.log('removed', removed);
                this.storage.saveIntoStorage('postLike', el);
                this.isLiked[data.postId] = false;
              } else {
                //for same postID and diff email
                arrayToAccess.push(this.details.email);
                console.log(`Added '${this.details.email}' to the array`);
                this.storage.saveIntoStorage('postLike', el);
                this.isLiked[data.postId] = true;
                this.checkLike(data);
              }
            }
          } else {
            //for new PostID
            el[data.postId] = [this.details.email];
            console.log(el);
            this.storage.saveIntoStorage('postLike', el);
            this.isLiked[data.postId] = true;
            this.checkLike(data);
          }
        } else {
          let postObj: any = {};
          postObj[data.postId] = [this.details.email];
          console.log(postObj);
          this.storage.saveIntoStorage('postLike', postObj);
          this.isLiked[data.postId] = true;
          this.checkLike(data);
        }
      });
    } else {
      this.alert.presentAlert('Age is less than 20');
    }
  }

  checkLike(data: any) {
    this.storage.getfromStorage('postLike').then((el: any) => {
      if (el != null) {
        if (el.hasOwnProperty(data.postId)) {
          let arrayToAccess = el[data.postId];
          if (Array.isArray(arrayToAccess)) {
            let index = arrayToAccess.filter(
              (value) => value === this.details.email
            );
            console.log('index', index);
            if (index.length > 0) {
              this.totalLikes = index.length;
            } else {
              this.totalLikes = this.totalLikes--;
            }
          }
        }
      }
    });
  }

  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  isFilterActive: boolean = false;
  handleChange(event: any) {
    this.filterItem = this.postDetails.filter(
      (el: any) =>
        el.title
          .trim()
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) > -1
    );
    console.log('search', this.filterItem);
    if (this.filterItem.length > 0) {
      this.isFilterActive = true;
    } else {
      this.filterItem = this.postDetails;
      this.isFilterActive = false;
    }
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
            this.router.navigate(['/post-update'], navigationExtras);
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
