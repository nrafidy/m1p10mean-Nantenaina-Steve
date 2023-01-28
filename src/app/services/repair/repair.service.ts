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
}
