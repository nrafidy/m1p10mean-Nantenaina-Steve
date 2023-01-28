import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { Car } from 'src/app/models/Car.model';
import { User } from 'src/app/models/User.model';
import { DepositService } from '../deposit/deposit.service';
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

  getCars(): Car[]{
    return [
      {
        ID: '1',
        color:'red',
        deposits:[
          {
            ID:'1',
            payment:'pending',
            state:'received',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            repairs: DepositService.getRepairs()
          },
          {
            ID:'1',
            payment:'pending',
            state:'received',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            repairs: DepositService.getRepairs()
          },
        ],
        make:'BMW',
        model:'e30',
        vin:'123456789'
      },
      {
        ID: '1',
        color:'red',
        deposits:[{
          ID:'1',
          payment:'pending',
          state:'received',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          repairs: DepositService.getRepairs()
        }],
        make:'BMW',
        model:'e30',
        vin:'123456789'
      },
      {
        ID: '1',
        color:'red',
        deposits:[{
          ID:'1',
          payment:'pending',
          state:'received',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          repairs: DepositService.getRepairs()
        }],
        make:'BMW',
        model:'e30',
        vin:'123456789'
      },
      {
        ID: '1',
        color:'red',
        deposits:[{
          ID:'1',
          payment:'pending',
          state:'received',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          repairs: DepositService.getRepairs()
        }],
        make:'BMW',
        model:'e30',
        vin:'123456789'
      }
    ];
  }
}
