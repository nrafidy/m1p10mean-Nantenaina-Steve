import { Component, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { APP_SERVICE_CONFIG } from '../appconfig/appconfig.service';
import { Appconfig } from '../interfaces/appconfig.interface';
import { User } from '../models/User.model';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  pageShown = 'login';
  user: User = {
    ID: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
    validationEmail: false,
    access_token: ''
  }

	constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  loginSubmit(){
    // this.userService.login(this.user).pipe(take(1)).subscribe(data => {
    //   console.log(data);
      this.modalService.dismissAll();
      this.router.navigate(['/admin']);
    // });
  }

  signupSubmit(){
    this.userService.signup(this.user).pipe(take(1)).subscribe(data => {
      console.log(data);
      this.pageShown = 'signup-success';
    });
  }
}
