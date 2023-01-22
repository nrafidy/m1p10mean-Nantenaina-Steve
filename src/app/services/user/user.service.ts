import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { User } from 'src/app/models/User.model';
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) { }

  // hashPassword(password: string): string{
  //   const salt = bcrypt.genSaltSync(10);
  //   return bcrypt.hashSync(password, salt);
  // }

  login(user: User){
    return this.http.post<User>('/api/auth/login', user);
  }

  signup(user: User){
    return this.http.post('/api/auth/inscription', user);
  }

  test(){
    return this.http.get('/api/auth/test-db');
  }
}
