import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/appconfig/appconfig.service';
import { Appconfig } from 'src/app/interfaces/appconfig.interface';
import { User } from 'src/app/models/User.model';
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl!: string;
  private userUrl!: string;

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient
  ) {
    this.authUrl = config.apiEndpoint.concat("api/auth/");
    this.userUrl = config.apiEndpoint.concat("api/user/");
  }

  login(user: User){
    return this.http.post<User>(this.authUrl.concat('login'), user);
  }

  signup(user: User){
    return this.http.post<User>(this.authUrl.concat('inscription'), user);
  }

  getUserFromLocalStorage(): User{
    const userToken = JSON.parse(localStorage.getItem("user_token") as string);
    const currentUser = {
      ID: userToken.user._id,
      firstname: userToken.user.firstname,
      lastname: userToken.user.lastname,
      email: userToken.user.email,
      password: '',
      type: userToken.user.type,
      validationEmail: userToken.user.validationEmail,
      access_token: userToken._id,
      cars: []
    };
    return currentUser;
  }
}
