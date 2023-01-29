import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from '../models/Car.model';
import { Deposit } from '../models/Deposit.model';
import { CarService } from '../services/car/car.service';
import { DepositService } from '../services/deposit/deposit.service';
import { LocalStorageService } from '../services/localstorage/localstorage.service';
import { RepairService } from '../services/repair/repair.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent {
  cars: Car[] = [];
  search = '';

  constructor(
    private carService: CarService,
    private depositService: DepositService,
    private repairService: RepairService,
    private lService: LocalStorageService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.setCars();
  }

  setCars(){
    this.spinner.show();
    const user = JSON.parse(localStorage.getItem('user_token') as string).user;
    this.carService.getCarsByUser(user).pipe(take(1)).subscribe((val) => {
      this.cars = [];
      const value = JSON.parse(JSON.stringify(val));
      value.forEach((car: any) => {
        let nCar: Car = {
          ID: car._id,
          color: '',
          make: car.marque,
          model: car.model,
          vin: car.matricule,
          userID: car.user,
          deposits: []
        }
        this.depositService.getAll(nCar).pipe(take(1)).subscribe((val) => {
          if(val){
            const value = JSON.parse(JSON.stringify(val));
            value.forEach( (dep: any) => {
              let depot: Deposit = {
                ID: dep._id,
                state: dep.State,
                payment: dep.Paiement,
                createdAt: dep.createdDate,
                updatedAt: dep.updatedDate,
                repairs: []
              }
              this.repairService.getRepairs(depot).pipe(take(1)).subscribe(val => {
                if(val){
                  const value = JSON.parse(JSON.stringify(val));
                  value.forEach((element: any) => {
                    depot.repairs.push({
                      ID: element._id,
                      type: element.type,
                      state: element.State,
                      name: element.name,
                      amount: element.montant,
                      payment: element.paiement
                    });
                  });
                }
                nCar.deposits.push(depot);
                this.spinner.hide();
              });
            });
            this.cars.push(nCar);
          } else {
            this.cars.push(nCar);
          }
        });
      });
    });
  }
}
