import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common/common.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthGuardService } from 'src/app/Services/auth/auth-gaurd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-pin',
  templateUrl: './check-pin.page.html',
  styleUrls: ['./check-pin.page.scss'],
})
export class CheckPinPage implements OnInit {
  public enteredPin: String = '';

  constructor(
              private alertCtrl: AlertController,
              private commonService: CommonService,
              private auth: AuthGuardService,
              private router: Router
             ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  validatePin() {
    this.auth.isUserLoggedIn.next(true);
    if (this.enteredPin === this.commonService.getAppPin()) {
       this.router.navigateByUrl('/home');
      // this.navigate.navigateBack('home');
       this.auth.isUserLoggedIn.next(true);
    } else {
      this.commonService.presentAlert('You Entered the wrong pin.');
    }
  }

  forgetPin() {
    setTimeout(() => {
      this.commonService.logOut();
      this.router.navigateByUrl('/login');
      // this.navigate.navigateForward('login');
    }, 1000);
  }

}
