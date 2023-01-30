import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { StatsService } from '../services/stats/stats.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  faClock = faHourglass;
  salary = 0;
  rent = 0;
  buy = 0;
  other = 0;
  caMonth = 0;
  caDay = 0;
  repairTime = 0;
  gain = 0;

  constructor(
    private statService: StatsService,
    private datePipe: DatePipe
  ){

  }

  ngOnInit(){
    const date = new Date();
    const today = this.datePipe.transform(date, 'yyyy-MM-dd');
    const month = this.datePipe.transform(date, 'MM');
    const year = this.datePipe.transform(date, 'yyyy');

    this.statService.getCaDay(today as string).pipe(take(1)).subscribe(val => {
      this.caDay = JSON.parse(JSON.stringify(val)).total;
    });

    this.statService.getCaMois(month as string, year as string).pipe(take(1)).subscribe(val => {
      this.caMonth = JSON.parse(JSON.stringify(val)).total;
    });

    this.statService.getMeanTime().pipe(take(1)).subscribe(val => {
      this.repairTime = JSON.parse(JSON.stringify(val)).result;
    });

  }

  submitGain(){
    const date = new Date();
    const month = this.datePipe.transform(date, 'MM');
    const year = this.datePipe.transform(date, 'yyyy');
    this.statService.getMonthGain(month as string, year as string, this.salary, this.rent, this.buy, this.other).pipe(take(1)).subscribe(val => {
      this.gain = JSON.parse(JSON.stringify(val)).total;
      console.log(val);
    });
  }
}
