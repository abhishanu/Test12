import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnlockWithPinPage } from './unlock-with-pin.page';

const routes: Routes = [
  {
    path: '',
    component: UnlockWithPinPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnlockWithPinPage]
})
export class UnlockWithPinPageModule {}
