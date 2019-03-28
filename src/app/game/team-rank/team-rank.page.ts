import { CommonService } from 'src/app/Services/common/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.page.html',
  styleUrls: ['./team-rank.page.scss'],
})
export class TeamRankPage implements OnInit {

  constructor(
              public _commonService: CommonService
             ) { }

  ngOnInit() {
    
  }

}
