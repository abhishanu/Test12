import { CommonService } from 'src/app/Services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { GameDesc } from 'src/app/utility/commonUtil';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  public games: Array<GameDesc> = [];
  constructor(public _commonService: CommonService) {
   }

  ngOnInit() {
    this._commonService.addTest();
    this.games = this._commonService.getAllGameList();
  }

  openGame(id: any) {
    // this._commonService.presentAlert('Game Clicked:' + this.games[id].gameTitle);

    this._commonService.presentLoadingWithOptions();
  }

}
