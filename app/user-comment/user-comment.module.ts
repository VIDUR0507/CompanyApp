import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCommentPageRoutingModule } from './user-comment-routing.module';

import { UserCommentPage } from './user-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCommentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UserCommentPage],
})
export class UserCommentPageModule {}
