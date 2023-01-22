import { Injectable } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { DepositService } from '../deposit/deposit.service';
import { RepairService } from '../repair/repair.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

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
            repairs: new DepositService().getRepairs()
          },
          {
            ID:'1',
            payment:'pending',
            state:'received',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            repairs: new DepositService().getRepairs()
          },
        ],
        make:'BMW',
        model:'e30',
        user:{
          ID:'1',
          access_token:'asdfadsf',
          email:'test@test',
          firstname:'John',
          lastname:'Doe',
          password:'asfdasdf',
          type:'client',
          validationEmail: true
        },
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
          repairs: new DepositService().getRepairs()
        }],
        make:'BMW',
        model:'e30',
        user:{
          ID:'1',
          access_token:'asdfadsf',
          email:'test@test',
          firstname:'John',
          lastname:'Doe',
          password:'asfdasdf',
          type:'client',
          validationEmail: true
        },
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
          repairs: new DepositService().getRepairs()
        }],
        make:'BMW',
        model:'e30',
        user:{
          ID:'1',
          access_token:'asdfadsf',
          email:'test@test',
          firstname:'John',
          lastname:'Doe',
          password:'asfdasdf',
          type:'client',
          validationEmail: true
        },
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
          repairs: new DepositService().getRepairs()
        }],
        make:'BMW',
        model:'e30',
        user:{
          ID:'1',
          access_token:'asdfadsf',
          email:'test@test',
          firstname:'John',
          lastname:'Doe',
          password:'asfdasdf',
          type:'client',
          validationEmail: true
        },
        vin:'123456789'
      }
    ];
  }
}
