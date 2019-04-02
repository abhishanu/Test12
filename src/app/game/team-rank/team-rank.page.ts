import { TeamDesc } from './../../utility/commonUtil';
import { CommonService } from 'src/app/Services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.page.html',
  styleUrls: ['./team-rank.page.scss'],
})
export class TeamRankPage implements OnInit {
  public teamList: Array<TeamDesc> = [];
  constructor(
              public _commonService: CommonService,
              private router: Router,
              private alertCtrl: AlertController,
             ) {
                  this.teamList = this._commonService.getTeamNameList();
               }

  ngOnInit() {
  }

  moveTeamRank(event) {
    if (event.currentTarget.childElementCount === this.teamList.length) {
      if (this.teamList[event.detail.to] !== undefined) {
        const tempFrom: any = this.teamList[event.detail.from];
        this.teamList[event.detail.from] = this.teamList[event.detail.to];
        this.teamList[event.detail.to] = tempFrom;
      }
    }

    event.detail.complete();
  }

  saveTeamOrder() {
    this._commonService.setTeamList(this.teamList);
    this.router.navigateByUrl('/home');
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: [{
          text: 'Ok',
          handler: () => {
            this.saveTeamOrder();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            this.saveTeamOrder();
          }
        }
      ]
    });

    await alert.present();
  }

  submit() {
    this.presentAlert('Save team rank order?');
  }
}
