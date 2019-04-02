import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/Services/auth/auth-gaurd.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request/request.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.page.html',
  styleUrls: ['./forget-pwd.page.scss'],
})
export class ForgetPwdPage implements OnInit {
  id: String = '';
  pwd: String = '';
  constructor(
    private reqService: RequestService,
    private router: Router,
    private commonService: CommonService,
    private alertCtrl: AlertController,
    private auth: AuthGuardService
  ) { }

  ngOnInit() {
    this.id = '';
    this.pwd = '';
  }

  changePwd() {
    console.log('Pwd Change request.');
    const request = {
      'userName': this.id, 'pwd': this.pwd
    };
    this.reqService.post('forgetPwd', request).toPromise().then(res => {
      if (res['state'] === true) {
        this.presentAlert('Password Changed.Please login', true);
      } else {
        this.presentAlert('User name not found', false);
      }
    }).catch(err => {
      this.presentAlert('Network Issue.Try later', false);
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
              this.router.navigateByUrl('/login');
            } else {
              this.router.navigateByUrl('/forgetPwd');
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
