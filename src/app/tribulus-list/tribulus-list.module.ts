import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TribulusListPage } from './tribulus-list.page';

const routes: Routes = [
  {
    path: '',
    component: TribulusListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TribulusListPage]
})


export class TribulusListPageModule {}

const menuCtrl = document.querySelector('ion-menu-controller');

function openFirst() {
  menuCtrl.enable(true, 'first');
  menuCtrl.open('first');
}

function openEnd() {
  menuCtrl.open('end');
}

function openCustom() {
  menuCtrl.enable(true, 'custom');
  menuCtrl.open('custom');
}
