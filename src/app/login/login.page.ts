import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CommonService } from '../Services/common/common.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../Services/auth/auth-gaurd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPwd: Boolean = false;
  pwdType: String = 'password';
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
              private auth: AuthGuardService
              )  {
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
        const name = this.loginDetails.get('name').value;
        const pwd = this.loginDetails.get('pwd').value;
        this.commonService.logIn(name, pwd).then(res => {
            const isLoggedIn: any = res.valueOf();
            if (isLoggedIn['state'] === true) {
              this.commonService.Userlogin.name = name;
              this.commonService.userId = isLoggedIn.responseMap.userId;
              this.presentAlert('Log in successfully for:' + name, true);
              this.auth.isUserLoggedIn.next(true);
            } else {
              this.presentAlert('Login Failed..', false);
            }
          }).catch(
            err => {
              this.presentAlert('Network Issue.Please try later....', false);
            });
      this.commonService.clearAppPin();
    } else {
      this.presentAlert('Invalid', false);
      this.commonService.clearAppPin();
    }
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
              this.router.navigateByUrl('/login');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  changePwdView() {
    this.showPwd = ! this.showPwd;
    if (this.showPwd) {
      this.pwdType = 'text';
    } else {
      this.pwdType = 'password';
    }

  }

}
