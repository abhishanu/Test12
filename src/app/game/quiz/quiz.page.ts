import { CommonService } from 'src/app/Services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { GameDesc } from 'src/app/utility/commonUtil';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  public games: Array<GameDesc> = [];
  constructor(
              public _commonService: CommonService,
              public navigate: NavController
             ) { }

  ngOnInit() {
    this.games = this._commonService.getAllGameList();
  }

  openGame(id: any) {
    this._commonService.presentLoadingWithOptions();
    this.navigate.navigateForward('/teamRank');
  }

  move(event) {
    if (event.currentTarget.childElementCount === this.games.length) {
      if (this.games[event.detail.to] !== undefined) {
        const tempFrom: any = this.games[event.detail.from];
        this.games[event.detail.from] = this.games[event.detail.to];
        this.games[event.detail.to] = tempFrom;
      }
    }

    event.detail.complete();
  }

}
