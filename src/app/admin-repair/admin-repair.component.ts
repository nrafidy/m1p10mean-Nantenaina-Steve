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
import { take } from 'rxjs';


@Component({
  selector: 'app-admin-repair',
  templateUrl: './admin-repair.component.html',
  styleUrls: ['./admin-repair.component.scss']
})
export class AdminRepairComponent {
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

  compare = (a: number | string, b: number | string, isAsc: boolean) => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  @Input() car!: Car;
  @Input() carIndex!: number;

	constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public depositService: DepositService,
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private modalService: NgbModal,
    private repairService: RepairService
  ) {}

  ngOnInit(){
    const allRepairs = DepositService.getRepairs();
    allRepairs.forEach(repair => {
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
    this.sortedRepairs = this.repairs.slice();
    this.sortedMaintenances = this.maintenances.slice();
    this.sortedDiags = this.diags.slice();
  }

  submitRepair(){
    console.log(this.addRepair);
    let repairs = this.repairs;
    let maintenances = this.maintenances;
    let diags = this.diags;
    let userToken = JSON.parse(localStorage.getItem('user_token') as string);
    let index = this.carIndex;
    this.repairService.addRepair(this.car.deposits[0], this.addRepair).pipe(take(1)).subscribe({
      next(value) {
        const res = JSON.parse(JSON.stringify(value)).repair;
        const repair: Repair = {
          ID: res._id,
          type: res.type,
          state: res.State,
          name: res.Name,
          amount: res.montant,
          payment: res.paiement,
        }
        // if(repair.type == 'repair'){
        //   repairs.push(repair);
        // }
        // if(repair.type == 'maintenance'){
        //   maintenances.push(repair);
        // }
        // if(repair.type == 'diagnostic'){
        //   diags.push(repair);
        // }
        userToken.user.cars[index].deposits[0].repairs.push(repair);
        localStorage.setItem('user_token', JSON.stringify(userToken));
      },
      error(err) {

      },complete() {

      },
    });
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
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

