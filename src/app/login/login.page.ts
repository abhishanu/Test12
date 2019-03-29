import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../Services/common/common.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../Services/auth/auth-gaurd.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginDetails: FormGroup;
  validation_messages = {
    'name': [
    { type: 'required', message: 'Please enter your name.'}
    ],
    'pwd': [
      { type: 'required', message: 'Name is required.'},
      { type: 'minlength', message: 'Password must be composed of min 5 digits.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private commonService: CommonService,
              private router: Router,
              private auth: AuthGuardService)  {
  }

  ngOnInit() {
    this.commonService.isPinExists();
    this.createFormValidator();
  }

  createFormValidator() {
    this.loginDetails = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      pwd: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ionViewWillEnter() {
    this.commonService.isPinExists();
  }

  login() {
    if (this.loginDetails.valid) {
    this.commonService.Userlogin.name = this.loginDetails.get('name').value;
    this.auth.isUserLoggedIn.next(true);
      this.presentAlert('Log in successfully for:' + this.commonService.Userlogin.name);
      this.commonService.clearAppPin();
    } else {
      this.presentAlert('Invalid');
      this.commonService.clearAppPin();
    }
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      cssClass: 'custom-alert-box',
      message: msg,
      buttons: [{
          text: 'Ok',
          cssClass: 'alert-Buttons',
          handler: () => {
            this.goToCreatePinScreen();
          }
        }
      ]
    });

    await alert.present();
  }

  goToCreatePinScreen() {
    this.router.navigateByUrl('/unlockWithPin');
   // this.navigate.navigateForward('/unlockWithPin');
  }

}
