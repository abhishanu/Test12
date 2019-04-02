import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/Services/request/request.service';

@Component({
  selector: 'app-choose-team',
  templateUrl: './choose-team.page.html',
  styleUrls: ['./choose-team.page.scss'],
})
export class ChooseTeamPage implements OnInit {

  constructor(
    private req: RequestService
  ) { }

  ngOnInit() {
  }

  getPlayers() {
    this.req.get('getPlayersOfTeam/RR');
  }
}
