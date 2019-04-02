import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  apikey = 'bntzTzZ22SUW8oEgs0dyLZTJuAv1';
  url = 'https://cricapi.com/api/';
  private baseUrl = 'http://localhost:7000/';
  allMatches: Array<any> = [];

  private _upcomingMatches: Array<any> = [];
  public get upcomingMatches(): Array<any> {
    return this._upcomingMatches;
  }
  public set upcomingMatches(value: Array<any>) {
    this._upcomingMatches = value;
  }
  constructor(private http: HttpClient) { }

  public login(request: any) {
    return this.http.post(this.baseUrl + 'login', request).toPromise();
  }

  public getAllUpcomingMatches() {
    this.http.get(this.baseUrl + 'getMatches').subscribe(
      allatchesData => {
        this.allMatches = allatchesData['matches'];
        console.log(this.allMatches);
        this.allMatches.forEach(match => {
          if (match.matchStarted === false) {
            if (match.type === 'Twenty20') {
              const date: Date = new Date();
              if (new Date(match.date) <= new Date(date.setDate(date.getDate() + 1))) {
                this.upcomingMatches.push(match);
              }
            }
          }
        });
        console.log(this.upcomingMatches);
      }
    );
  }

  public get(service: string) {
    return this.http.get(this.baseUrl + service);
  }

  public post(service: string, request: any) {
    return this.http.post(this.baseUrl + service, request);
  }
}
