import { AuthGuardService } from './../auth/auth-gaurd.service';
import { Injectable } from '@angular/core';

import {Storage } from '@ionic/storage';

import { LoadingController, NavController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private items: Array<{ title: string; note: string}> = [];

  private appPin: String;
  constructor(private storage: Storage,
              private alertCtrl: AlertController,
              private loadingController: LoadingController,
              private auth: AuthGuardService,
              private router: Router,
              private navigate: NavController
              ) { }

  public addItemToList(titleName: string , noteValue: string) {
    this.items.push({
      title: titleName,
      note: noteValue
    });
  }

  isPinExists() {
    if (this.getAppPin() !== undefined) {
      console.log('pin existed');
      this.router.navigate(['check-pin']);
    }
  }

  public getAppPin(): String {
    return this.appPin;
  }

  public savePin(pin: String) {
    this.appPin = pin;
    this.storage.set('pin', pin);
   // this.router.navigate(['profile']);
    this.router.navigateByUrl('/profile');
    // this.navigate.navigateRoot('/profile');
  }

  public getPin() {
    return this.storage.get('pin').then(res => {
      if (res) {
        this.appPin = res;
      } else {
        this.appPin = undefined;
      }
    });
  }

  public clearAppPin() {
    this.appPin = undefined;
    this.storage.remove('pin');
  }

  public deleteItemFromList() {
    console.log('Delete request');
  }

  public getList(): Array<{ title: string; note: string}> {
    return this.items;
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  public logOut () {
    this.storage.remove('pin').then(() => {
      this.appPin = undefined;
      this.presentAlert('Last Pin Removed');
      this.auth.isUserLoggedIn.next(false);
    }
    ).catch(() => {
      this.presentAlert('Log Out Failed.');
    }
    );
  }

}
