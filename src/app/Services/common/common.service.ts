
import { GameDesc, TeamDesc } from './../../utility/commonUtil';

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
  Userlogin = {name: '', pwd: ''};
  private teamNameList: Array<TeamDesc> = [
                                            {teamName: 'CSK', flag: '', id: 1},
                                            {teamName: 'RCB', flag: '', id: 2},
                                            {teamName: 'DC', flag: '', id: 3},
                                            {teamName: 'MI', flag: '', id: 4},
                                            {teamName: 'XIPU', flag: '', id: 5},
                                            {teamName: 'RR', flag: '', id: 6},
                                            {teamName: 'KKR', flag: '', id: 7},
                                            {teamName: 'SRH', flag: '', id: 8}
                                          ];
  private gamesList: Array<GameDesc> = [];
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

  public getAllGameList (): Array<GameDesc> {
    return this.gamesList;
  }

  public addGameToList(game: GameDesc) {
    this.gamesList.push(game);
  }

  addTest() {
    const game: GameDesc = {gameTitle: 'Arrange your team', desc: 'Choose your team rankings..', id: 1} ;
    const game2: GameDesc = {gameTitle: 'Arrange your team2', desc: 'Choose your team rankings2..', id: 2} ;
    this.addGameToList(game);
    this.addGameToList(game2);
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
      duration: 2000,
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

  public onBackPressed() {
    console.log('Back Button Pressed');
    this.navigate.goBack(true);
  }

}
