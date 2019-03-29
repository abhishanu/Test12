import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  apikey = 'bntzTzZ22SUW8oEgs0dyLZTJuAv1';
  url = 'https://cricapi.com/api/';
  constructor(private _http: Http) { }

  public getAllUpcomingMatches() {
    this._http.get(this.url + 'matches?apikey=' + this.apikey).subscribe(comingMatchesData => {
      console.log(comingMatchesData);
    });
  }
}
