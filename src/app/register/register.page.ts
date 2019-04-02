import { AuthGuardService } from './../Services/auth/auth-gaurd.service';
import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Services/request/request.service';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private reqService: RequestService,
    private router: Router,
    private commonService: CommonService,
    private alertCtrl: AlertController,
    private auth: AuthGuardService
  ) { }
  userName: string;
  pwd: String;
  confirmPwd: String;
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userName = null;
    this.pwd = null;
    this.confirmPwd = null;
  }

  signUp () {
    const request = {
      'name': this.userName, 'pwd': this.pwd
    };

    this.reqService.post('signUp', request).toPromise().then(res => {
      if (res['state'] === true) {
        this.auth.isUserLoggedIn.next(true);
        this.commonService.Userlogin.name = this.userName;
        this.presentAlert('Registation Successfull', true);
      } else {
        this.presentAlert('Registation Failed.Please try again...', false);
      }
    }).catch(err => {
      this.presentAlert('Network Issue.Please try again...', false);
    });
  }

  async presentAlert(msg: string, state: boolean) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      cssClass: 'custom-alert-box',
      message: msg,
      buttons: [{
          text: 'Ok',
          cssClass: 'alert-Buttons',
          handler: () => {
            if (state) {
              this.router.navigateByUrl('/unlockWithPin');
            } else {
              this.router.navigateByUrl('/register');
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
