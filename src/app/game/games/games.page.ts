import { RequestService } from './../../Services/request/request.service';
import { CommonService } from 'src/app/Services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { GameDesc } from 'src/app/utility/commonUtil';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(
                public _commonService: CommonService,
                public navigate: NavController,
                public reqService: RequestService
             ) {
               //   this.reqService.getAllUpcomingMatches();
                  this._commonService.addTest();
               }

  allGamesList: Array<GameDesc> = [];

  ngOnInit() {
    this.allGamesList = this._commonService.getAllGameList();
  }

  openGame(gameIndex: any) {
    console.log('Open Game:' + this.allGamesList[gameIndex].gameTitle);
    this.navigate.navigateForward(this.allGamesList[gameIndex].url);
  }
}
