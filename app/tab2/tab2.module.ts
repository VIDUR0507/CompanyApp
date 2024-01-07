import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ParentComponentComponent } from '../parent-component/parent-component.component';
import { ChildComponent } from '../child/child.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab2Page, ParentComponentComponent, ChildComponent],
})
  
export class Tab2PageModule {}
