import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostUpdatePageRoutingModule } from './post-update-routing.module';

import { PostUpdatePage } from './post-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostUpdatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PostUpdatePage],
})
export class PostUpdatePageModule {}
