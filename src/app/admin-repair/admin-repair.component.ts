import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { Repair } from '../models/Repair.model';
import { DepositService } from '../services/deposit/deposit.service';
import { Car } from '../models/Car.model';
import { APP_SERVICE_CONFIG } from '../appconfig/appconfig.service';
import { Appconfig } from '../interfaces/appconfig.interface';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RepairService } from '../services/repair/repair.service';
import { Subscription, take } from 'rxjs';
import { LocalStorageService } from '../services/localstorage/localstorage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Deposit } from '../models/Deposit.model';
import { UserType } from '../models/User.model';


@Component({
  selector: 'app-admin-repair',
  templateUrl: './admin-repair.component.html',
  styleUrls: ['./admin-repair.component.scss']
})
export class AdminRepairComponent {
  canCollect = true;
  allPaid = true;
  userType!: UserType;
  storageSub!: Subscription;
  addRepair: Repair = {
    ID: '',
    type: 'repair',
    state: 'todo',
    name: '',
    amount: 0,
    payment: 'pending'
  };
  repairs: Repair[] = [];
  maintenances: Repair[] = [];
  diags: Repair[] = [];

  sortedRepairs: Repair[] = [];
  sortedMaintenances: Repair[] = [];
  sortedDiags: Repair[] = [];

  repairAdv = 0;
  maintenanceAdv = 0;
  diagAdv = 0;

  compare = (a: number | string, b: number | string, isAsc: boolean) => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  car: Car = {
    ID: '',
    color: '',
    make: '',
    model: '',
    vin: '',
    deposits: [],
    userID: ''
  };
  @Input() carIndex!: number;

	constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public depositService: DepositService,
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private modalService: NgbModal,
    private repairService: RepairService,
    private lService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {

  }

  setRepairs(){
    this.canCollect = true;
    this.allPaid = true;
    this.spinner.show();
    this.repairs = [];
    this.maintenances = [];
    this.diags = [];
    let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
    this.depositService.getOnGoing(lCars[this.carIndex]).pipe(take(1)).subscribe((val) => {
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
        lCars[this.carIndex].deposits = [];
        lCars[this.carIndex].deposits.push(depot);
        this.repairService.getRepairs(depot).pipe(take(1)).subscribe(val => {
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
          const allRepairs = depot.repairs;
          allRepairs.forEach(repair => {
            if(repair.payment === 'pending'){
              this.allPaid = false;
            }
            if(repair.state !== 'done'){
              this.canCollect = false;
            }
            if(repair.type == 'repair'){
              this.repairs.push(repair);
            }
            if(repair.type == 'maintenance'){
              this.maintenances.push(repair);
            }
            if(repair.type == 'diagnostic'){
              this.diags.push(repair);
            }
          });
          this.setScore();
          this.sortedRepairs = this.repairs.slice();
          this.sortedMaintenances = this.maintenances.slice();
          this.sortedDiags = this.diags.slice();

          this.car = lCars[this.carIndex];
          localStorage.setItem('cars', JSON.stringify(lCars));
          this.spinner.hide();
        });
      } else {
        lCars[this.carIndex].deposits = [];
        this.canCollect = true;
        this.car = lCars[this.carIndex];
        localStorage.setItem('cars', JSON.stringify(lCars));
        this.spinner.hide();
      }
    });
  }

  ngOnInit(){
    this.userType = JSON.parse(localStorage.getItem('user_token') as string).user.type;
    this.setRepairs();
    this.storageSub = this.lService.watchStorage().subscribe((val) => this.setRepairs());
  }

  ngOnDestroy(){
    this.storageSub.unsubscribe();
  }

  submitRepair(){
    this.spinner.show();
    this.repairService.addRepair(this.car.deposits[0], this.addRepair).pipe(take(1)).subscribe(val => {
      const value = JSON.parse(JSON.stringify(val));
      let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
      this.modalService.dismissAll();
      this.lService.setItem('cars', JSON.stringify(lCars));
      this.spinner.hide();
    });
  }

  markDeposit(){
    this.depositService.addDeposit(this.car).pipe(take(1)).subscribe(val => {
      this.setRepairs();
    });
  }

  markPending(){
    this.depositService.markPending(this.car.deposits[0]).pipe(take(1)).subscribe(val => {
      this.setRepairs();
    });
  }

  markReceived(){
    this.depositService.markReceived(this.car.deposits[0]).pipe(take(1)).subscribe(val => {
      this.setRepairs();
    });
  }

  markReady(){
    this.depositService.markReady(this.car.deposits[0]).pipe(take(1)).subscribe(val => {
      this.setRepairs();
    });
  }

  markCollected(){
    this.depositService.markCollected(this.car.deposits[0]).pipe(take(1)).subscribe(val => {
      this.setRepairs();
      alert('Bon de sortie approuvé');
    });
  }

  markDone(repair: Repair){
    this.spinner.show();
    this.repairService.markDone(repair).pipe(take(1)).subscribe(val => {
      let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
      this.lService.setItem('cars', JSON.stringify(lCars));
      this.spinner.hide();
    });
  }

  markPaid(repair: Repair){
    this.spinner.show();
    this.repairService.markPaid(repair).pipe(take(1)).subscribe(val => {
      let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
      this.lService.setItem('cars', JSON.stringify(lCars));
      this.spinner.hide();
    });
  }

  markCancelled(repair: Repair){
    this.spinner.show();
    this.repairService.markCancelled(repair).pipe(take(1)).subscribe(val => {
      let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
      this.lService.setItem('cars', JSON.stringify(lCars));
      this.spinner.hide();
    });
  }

  markInProgress(repair: Repair){
    this.spinner.show();
    this.repairService.markInProgress(repair).pipe(take(1)).subscribe(val => {
      let lCars: Car[] = JSON.parse(localStorage.getItem('cars') as string);
      this.lService.setItem('cars', JSON.stringify(lCars));
      this.spinner.hide();
    });
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  setScore(){
    this.repairAdv = 0;
    this.maintenanceAdv = 0;
    this.diagAdv = 0;

    this.repairs.forEach(element => {
      if(element.state === 'done' || element.state === 'cancelled'){
        this.repairAdv++;
      }
    });
    this.repairAdv = this.repairAdv / this.repairs.length  * 100;

    this.maintenances.forEach(element => {
      if(element.state === 'done' || element.state === 'cancelled'){
        this.maintenanceAdv++;
      }
    });
    this.maintenanceAdv = this.maintenanceAdv / this.maintenances.length  * 100;

    this.diags.forEach(element => {
      if(element.state === 'done' || element.state === 'cancelled'){
        this.diagAdv++;
      }
    });
    this.diagAdv = this.diagAdv / this.diags.length * 100;
  }

  sortRep(sort: Sort) {
    const data = this.repairs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedRepairs = data;
      return;
    }

    this.sortedRepairs = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'payment':
          return this.compare(a.payment, b.payment, isAsc);
        default:
          return 0;
      }
    });
  }

  sortMain(sort: Sort) {
    const data = this.maintenances.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedMaintenances = data;
      return;
    }

    this.sortedMaintenances = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'payment':
          return this.compare(a.payment, b.payment, isAsc);
        default:
          return 0;
      }
    });
  }

  sortDiag(sort: Sort) {
    const data = this.diags.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDiags = data;
      return;
    }

    this.sortedDiags = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'payment':
          return this.compare(a.payment, b.payment, isAsc);
        default:
          return 0;
      }
    });
  }
}

