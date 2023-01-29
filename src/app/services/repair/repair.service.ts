import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { Deposit } from 'src/app/models/Deposit.model';
import { Repair } from 'src/app/models/Repair.model';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private url!: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) {
    this.url = config.apiEndpoint.concat("api/repair/");
  }

  addRepair(deposit: Deposit, repair: Repair){
    const userToken = JSON.parse(localStorage.getItem('user_token') as string);
    const data = {
      type: repair.type,
      name: repair.name,
      montant: repair.amount,
      depositId: deposit.ID,
      access_token: userToken._id
    }
    return this.http.post(this.url.concat('create'), data);
  }

  getRepairs(deposit: Deposit){
    return this.http.get(this.url.concat('deposit/').concat(deposit.ID));
  }

  markPaid(repair: Repair){
    const data = {
      type: repair.type,
      name: repair.name,
      montant: repair.amount,
      State: repair.state,
      paiement: 'done'
    }
    return this.http.put(this.url.concat('update/').concat(repair.ID), data);
  }

  markDone(repair: Repair){
    const data = {
      type: repair.type,
      name: repair.name,
      montant: repair.amount,
      State: 'done',
      paiement: repair.payment
    }
    return this.http.put(this.url.concat('update/').concat(repair.ID), data);
  }

  markInProgress(repair: Repair){
    const data = {
      type: repair.type,
      name: repair.name,
      montant: repair.amount,
      State: 'in_progress',
      paiement: repair.payment
    }
    return this.http.put(this.url.concat('update/').concat(repair.ID), data);
  }

  markCancelled(repair: Repair){
    const data = {
      type: repair.type,
      name: repair.name,
      montant: repair.amount,
      State: 'cancelled',
      paiement: repair.payment
    }
    return this.http.put(this.url.concat('update/').concat(repair.ID), data);
  }
}
