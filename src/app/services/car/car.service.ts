import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { Car } from 'src/app/models/Car.model';
import { User } from 'src/app/models/User.model';
import { DepositService } from '../deposit/deposit.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { RepairService } from '../repair/repair.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carUrl: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private lService: LocalStorageService
  ) {
    this.carUrl = config.apiEndpoint.concat("api/car/");
  }

  addCar(car: Car){
    const access_token = JSON.parse(localStorage.getItem('user_token') as string);
    const data = {
      matricule: car.vin.replace(/\s/g,'').toUpperCase(),
      marque: car.make.toUpperCase(),
      model: car.model.toUpperCase(),
      image: '',
      access_token: access_token._id
    }
    return this.http.post<Car>(this.carUrl.concat('create'), data);
  }

  getCarsByUser(user: User){
    return this.http.get(this.carUrl.concat('user/').concat(user.ID));
  }

  getCarById(ID: string){
    return this.http.get(this.carUrl.concat('id/').concat(ID));
  }

  getCarByMatricule(matricule: string){
    // const data = {
    //   access_token: JSON.parse(localStorage.getItem('user_token') as string)._id
    // }
    return this.http.get(this.carUrl.concat(matricule));
  }

  getCars(){
    return this.http.get(this.carUrl.concat('all'));
  }
}
