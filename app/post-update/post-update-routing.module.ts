import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostUpdatePage } from './post-update.page';

const routes: Routes = [
  {
    path: '',
    component: PostUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostUpdatePageRoutingModule {}
