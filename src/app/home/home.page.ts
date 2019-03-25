import { Component } from '@angular/core';
import { CommonService } from '../Services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private dataService: CommonService) {}

  public title: string;
  public note: string;

  public submitNote() {
    console.log('Title: ' + this.title);
    console.log('Note: ' + this.note);

    this.dataService.addItemToList(this.title, this.note);
    this.title = '';
    this.note = '';
  }

  ionViewWillEnter() {
    console.log('HomePage Enter');
  }
}
