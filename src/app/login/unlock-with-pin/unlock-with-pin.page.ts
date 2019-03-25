import { CommonService } from '../../Services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-unlock-with-pin',
  templateUrl: './unlock-with-pin.page.html',
  styleUrls: ['./unlock-with-pin.page.scss'],
})
export class UnlockWithPinPage implements OnInit {
  genratePin: String = '';
  constructor(private alertCtrl: AlertController, private navigate: NavController, private commonService: CommonService) { }

  ngOnInit() {
  }

  pinClicked(pinClicked: string) {
    this.genratePin = this.genratePin + pinClicked;
  }

  pinSave() {
    this.presentAlert('Your Pin is:' + this.genratePin);
  }

  ionAlertWillDismiss() {
  }

  ionViewWillEnter() {
   // this.commonService.presentLoadingWithOptions();
    const checkPin = this.commonService.getAppPin();

    if (checkPin) {
      this.navigate.navigateForward('/home');
    }
  }

  skipPinGeneration() {
    this.navigate.navigateForward('/list');
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Remember your Pin!',
      cssClass: 'custom-alert-box',
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
          cssClass: 'alert-Buttons',
          handler: () => {
            this.commonService.savePin(this.genratePin);
          }
        }
      ]
    });
    await alert.present();
  }

  clear() {
    this.genratePin = '';
  }

  backSpace() {
    this.genratePin = this.genratePin.substr(0, this.genratePin.length - 1);
  }

  skipPinGenration() {
    this.navigate.navigateForward('/home');
  }

}
