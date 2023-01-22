import { Component } from '@angular/core';
import { Car } from '../models/Car.model';
import { CarService } from '../services/car/car.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent {
  cars: Car[] = [];

  constructor(private carService: CarService){}

  ngOnInit(){
    this.cars = this.carService.getCars();
  }
}
