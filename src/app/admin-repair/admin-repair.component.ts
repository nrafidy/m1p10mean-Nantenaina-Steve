import { Component, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from '@angular/material/sort';
import { Repair } from '../models/Repair.model';
import { DepositService } from '../services/deposit/deposit.service';

@Component({
  selector: 'app-admin-repair',
  templateUrl: './admin-repair.component.html',
  styleUrls: ['./admin-repair.component.scss']
})
export class AdminRepairComponent {
  repairs: Repair[] = [];
  maintenances: Repair[] = [];
  diags: Repair[] = [];

  sortedRepairs: Repair[] = [];
  sortedMaintenances: Repair[] = [];
  sortedDiags: Repair[] = [];

  compare = (a: number | string, b: number | string, isAsc: boolean) => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  @Input() repairID: string = '';

	constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public depositService: DepositService
  ) {}

  ngOnInit(){
    const allRepairs = this.depositService.getRepairs();
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

