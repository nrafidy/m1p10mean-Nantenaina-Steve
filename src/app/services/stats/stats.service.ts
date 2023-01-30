import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private url: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
  ) {
    this.url = config.apiEndpoint.concat("api/statistique/");
  }

  getCaDay(date: string){
    return this.http.get(this.url.concat('cajour/').concat(date));
  }

  getCaMois(month: string, year: string){
    return this.http.get(this.url.concat('camois/').concat(month.toString()).concat('/').concat(year.toString()));
  }

  getMeanTime(){
    return this.http.get(this.url.concat('reparationTotal/'));
  }

  getMonthGain(month: string, year: string, salary: number, rent: number, piece: number, other: number){
    return this.http.get(
      this.url
      .concat('beneficemois/')
      .concat(month)
      .concat('/')
      .concat(year)
      .concat('/')
      .concat(salary.toString())
      .concat('/')
      .concat(rent.toString())
      .concat('/')
      .concat(piece.toString())
      .concat('/')
      .concat(other.toString())
    );
  }
}
