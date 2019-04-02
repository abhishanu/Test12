import { RequestService } from './../Services/request/request.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedMatch: any;
  public isItemLoaded: Boolean = false;
  public items: Array<{ title: string; note: string}> = [];

  constructor(
    private dataService: CommonService,
    private req: RequestService) {
      this.upcomingAllMatches = this.req.upcomingMatches;
      this.getMatches();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    console.log('ListPage Eneterd');
      if (this.upcomingAllMatches.length !== 0) {
        this.isItemLoaded = true;
      }
  }

  upcomingAllMatches: Array<any> = [];
  showMatchName: Array<{"name","id"}> = [];
  
  getMatches(){
    this.upcomingAllMatches.forEach(element => {
      let team1:String='';
      element['team-1'].split(' ')
                          .forEach(name=> {
                            team1 += name.slice(0,1);
                          });
      let team2:String='';
      element['team-2'].split(' ')
                        .forEach(name=> {
                          team2 += name.slice(0,1);
                        })
      this.showMatchName.push({"name":team1.toUpperCase()+' ' + 'Vs ' + team2.toUpperCase(),"id":element['unique_id']});
    });
  }

  openMatch(index:any) {
    let id = this.showMatchName[index].id;
    this.dataService.getPlayersList(id).toPromise().then(data=>{
      console.log(data);
      
    });
  }

}
