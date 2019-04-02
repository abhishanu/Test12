import { CommonService } from './../../Services/common/common.service';
import { AuthGuardService } from 'src/app/Services/auth/auth-gaurd.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
              private router: Router,
              private auth: AuthGuardService,
              private alertCtrl: AlertController,
              public commonService: CommonService
            ) {}

  ngOnInit() {
  }

  onBackPressed() {
    this.router.navigateByUrl('/home');
  }

  logout() {
      this.auth.logout();
      this.commonService.clearAppPin();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Log Out?',
     // cssClass: 'custom-alert-box',
      message: msg,
      backdropDismiss: false,
      buttons: [
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   cssClass: 'alert-Buttons',
        //   handler: (blah) => {
        //     this.genratePin = '';
        //   }
        // },
        {
          text: 'Ok',
          // cssClass: 'alert-ok-Buttons',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancel',
          // cssClass: 'alert-cancel-Buttons',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

}
