import { async } from '@angular/core/testing';

import { GameDesc, TeamDesc } from './../../utility/commonUtil';

import { AuthGuardService } from './../auth/auth-gaurd.service';
import { Injectable } from '@angular/core';

import {Storage } from '@ionic/storage';

import { LoadingController, NavController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RequestService } from '../request/request.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private items: Array<{ title: string; note: string}> = [];
  private _userId: any = null;
  public get userId(): any {
    return this._userId;
  }
  public set userId(value: any) {
    this._userId = value;
  }
  Userlogin = {name: '', pwd: ''};
  private gamesList: Array<GameDesc> = [];
  private appPin: String;
  private _teamNameList: Array<TeamDesc> = [
    { teamName: 'CSK', flag: '', id: 1 },
    { teamName: 'RCB', flag: '', id: 2 },
    { teamName: 'DC', flag: '', id: 3 },
    { teamName: 'MI', flag: '', id: 4 },
    { teamName: 'XIPU', flag: '', id: 5 },
    { teamName: 'RR', flag: '', id: 6 },
    { teamName: 'KKR', flag: '', id: 7 },
    { teamName: 'SRH', flag: '', id: 8 }
  ];
  public getTeamNameList(): Array<TeamDesc> {
    return this._teamNameList;
  }

  public setTeamList(teamListNew: Array<TeamDesc>) {
    this._teamNameList = teamListNew;
  }

  constructor(private storage: Storage,
              private alertCtrl: AlertController,
              private loadingController: LoadingController,
              private auth: AuthGuardService,
              private router: Router,
              private req: RequestService
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
    const game: GameDesc = {gameTitle: 'Arrange your team', desc: 'Choose your team rankings..', id: 1, url: '/teamRank'} ;
    const game2: GameDesc = {gameTitle: 'Sixes Compition', desc: 'Choose a player who will hit max sixes..', id: 2, url: '/quiz'} ;
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
    if (this.userId !== null) {
      const requestBody = {'User_Id': this.userId, 'Pin': pin };
      this.req.post('savePin', requestBody).toPromise().then(res => {
        this.appPin = pin;
        this.storage.set('pin', pin);
        this.router.navigateByUrl('/list');
      }).catch(err => {
        this.router.navigateByUrl('/login');
      });
    } else {
      this.router.navigateByUrl('/login');
    }
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

  public onBackPressed(page: any) {
    console.log('Back Button Pressed');
    this.router.navigateByUrl(page);
  }

  public logIn(user: any, pwd: any) {
    const request = {
      'name': user, 'pwd': pwd
    };
    return this.req.login(request);
  }

  public getPlayersList(id: any) {
    return this.req.get('getPlayerList/' + id);
  }


}
