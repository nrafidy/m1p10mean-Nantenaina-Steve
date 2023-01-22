import { Component } from '@angular/core';
import { Car } from '../models/Car.model';
import { CarService } from '../services/car/car.service';

@Component({
  selector: 'app-admin-facture',
  templateUrl: './admin-facture.component.html',
  styleUrls: ['./admin-facture.component.scss']
})
export class AdminFactureComponent {
  cars: Car[] = [];

  constructor(private carService: CarService){}

  ngOnInit(){
    this.cars = this.carService.getCars();
  }
}
