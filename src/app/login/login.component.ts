import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { APP_SERVICE_CONFIG } from '../appconfig/appconfig.service';
import { Appconfig } from '../interfaces/appconfig.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  pageShown = 'login';
  firstname = '';
  lastname = '';
  email = '';
  password = '';

	constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private userService: UserService) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  loginSubmit(){
  //   const data = new FormData();
  //   data.append('email', this.email);
  //   data.append('password', this.password);

    // this.httpClient.post<any>(AppSettings.API_AUTH_ENDPOINT, data).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    // console.log(data);
    // console.log(this.config.apiEndpoint);

  }

  signupSubmit(){}
}
