import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { Car } from 'src/app/models/Car.model';
import { Deposit } from 'src/app/models/Deposit.model';
import { Repair } from 'src/app/models/Repair.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private depUrl: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
  ) {
    this.depUrl = config.apiEndpoint.concat("api/deposit/");
  }

  addDeposit(car: Car){
    // const access_token = JSON.parse(localStorage.getItem('user_token') as string);
    return this.http.post<Car>(this.depUrl.concat('create/car/').concat(car.ID), { user: car.userID });
  }

  markReceived(deposit: Deposit){
    const data = {
      State: 'received',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markDone(deposit: Deposit){
    const data = {
      State: 'done',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markPending(deposit: Deposit){
    const data = {
      State: 'pending',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markReady(deposit: Deposit){
    const data = {
      State: 'ready',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markCollected(deposit: Deposit){
    const data = {
      State: 'collected',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markCancelled(deposit: Deposit){
    const data = {
      State: 'cancelled',
      paiement: deposit.payment
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  markPaid(deposit: Deposit){
    const data = {
      State: deposit.state,
      paiement: 'done'
    }
    return this.http.put(this.depUrl.concat('update/_/').concat(deposit.ID), data);
  }

  getOnGoing(car: Car){
    return this.http.get(this.depUrl.concat('ongoing/car/').concat(car.ID));
  }

  getAll(car: Car){
    return this.http.get(this.depUrl.concat('all/car/').concat(car.ID));
  }

}
