import { Component } from '@angular/core';
import { CommonService } from '../Services/common/common.service';
import { RequestService } from '../Services/request/request.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  upcomingAllMatches: Array<any> = [];
  showMatchName: Array<String> = [];
  constructor(
              private dataService: CommonService,
              private req: RequestService) {
                this.upcomingAllMatches = this.req.upcomingMatches;
                this.getMatches();
              }

  ionViewWillEnter() {
    console.log('HomePage Enter');
  }

  getMatches(){
    this.upcomingAllMatches.forEach(element => {
      let team1:String='';
      element['team-1'].split(' ')
                          .forEach(name=> {
                            team1 += name.slice(0,1)+' ';
                          });
      let team2:String='';
      element['team-2'].split(' ')
                        .forEach(name=> {
                          team2 += name.slice(0,1)+' ';
                        })
      this.showMatchName.push(team1.toUpperCase() + 'Vs ' + team2.toUpperCase());
    });
  }
}
