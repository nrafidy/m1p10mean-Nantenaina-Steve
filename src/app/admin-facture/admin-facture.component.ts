import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, take } from 'rxjs';
import { Car } from '../models/Car.model';
import { Deposit } from '../models/Deposit.model';
import { Repair } from '../models/Repair.model';
import { CarService } from '../services/car/car.service';
import { DepositService } from '../services/deposit/deposit.service';
import { LocalStorageService } from '../services/localstorage/localstorage.service';
import { RepairService } from '../services/repair/repair.service';

@Component({
  selector: 'app-admin-facture',
  templateUrl: './admin-facture.component.html',
  styleUrls: ['./admin-facture.component.scss']
})
export class AdminFactureComponent {
  cars: Car[] = [];
  userType = '';
  storageSub!: Subscription;
  search = '';

  constructor(
    private carService: CarService,
    private depositService: DepositService,
    private repairService: RepairService,
    private lService: LocalStorageService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.userType = JSON.parse(localStorage.getItem('user_token') as string).user.type;
    this.setCars();
    this.storageSub = this.lService.watchStorage().subscribe((val) => this.setCars());
  }

  ngOnDestroy(){
    this.storageSub.unsubscribe();
  }

  markPaid(repair: Repair, carIndex: number, repairIndex: number){
    this.repairService.markPaid(repair).pipe(take(1)).subscribe(val => {
      this.cars[carIndex].deposits[0].repairs[repairIndex].payment = 'done';
    });
  }

  setCars(){
    this.spinner.show();
    const user = JSON.parse(localStorage.getItem('user_token') as string).user;
    let lCars: Car[] = [];
    if(user.type === 'res_finance'){
      this.carService.getCars().pipe(take(1)).subscribe((val) => {
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
          this.depositService.getOnGoing(nCar).pipe(take(1)).subscribe((val) => {
            if(val){
              const value = JSON.parse(JSON.stringify(val));
              let depot: Deposit = {
                ID: value._id,
                state: value.State,
                payment: value.Paiement,
                createdAt: value.createdDate,
                updatedAt: value.updatedDate,
                repairs: []
              }
              nCar.deposits.push(depot);
              this.repairService.getRepairs(depot).pipe(take(1)).subscribe(val => {
                const value = JSON.parse(JSON.stringify(val));
                value.forEach((element: any) => {
                  nCar.deposits[0].repairs.push({
                    ID: element._id,
                    type: element.type,
                    state: element.State,
                    name: element.name,
                    amount: element.montant,
                    payment: element.paiement
                  });
                });
                this.spinner.hide();
                if(nCar.deposits[0] && nCar.deposits[0].repairs.length > 0) this.cars.push(nCar);
              });
            }
          });
        });
      });
    }
    if(user.type === 'client'){
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
          this.depositService.getOnGoing(nCar).pipe(take(1)).subscribe((val) => {
            if(val){
              const value = JSON.parse(JSON.stringify(val));
              let depot: Deposit = {
                ID: value._id,
                state: value.State,
                payment: value.Paiement,
                createdAt: value.createdDate,
                updatedAt: value.updatedDate,
                repairs: []
              }
              nCar.deposits.push(depot);
              this.repairService.getRepairs(depot).pipe(take(1)).subscribe(val => {
                const value = JSON.parse(JSON.stringify(val));
                value.forEach((element: any) => {
                  nCar.deposits[0].repairs.push({
                    ID: element._id,
                    type: element.type,
                    state: element.State,
                    name: element.name,
                    amount: element.montant,
                    payment: element.paiement
                  });
                });
                this.spinner.hide();
                if(nCar.deposits[0] && nCar.deposits[0].repairs.length > 0) this.cars.push(nCar);
                console.log(this.cars);
              });
            }
          });
        });
      });
    }
  }
}
