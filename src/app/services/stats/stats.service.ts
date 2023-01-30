import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private url: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private lService: LocalStorageService
  ) {
    this.url = config.apiEndpoint.concat("api/statistique/");
  }

  getCaDay(date: string){
    return this.http.get(this.url.concat('cajour/').concat(date));
  }

  getCaMois(month: number, year: number){
    return this.http.get(this.url.concat('camois/').concat(month.toString()).concat('/').concat(year.toString()));
  }

  getMonthGain(month: number, year: number, salary: number, rent: number, piece: number, other: number){
    return this.http.get(
      this.url
      .concat('beneficemois/')
      .concat(month.toString())
      .concat('/')
      .concat(year.toString())
      .concat(salary.toString())
      .concat(rent.toString())
      .concat(piece.toString())
      .concat(other.toString())
    );
  }
}
