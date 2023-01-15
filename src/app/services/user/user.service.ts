import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) { }

  // login(data){
  //   this.http.post('/api/auth/login', data);
  // }

  // getUser(){
  //   this.http.get('/api/user/me');
  // }


}
