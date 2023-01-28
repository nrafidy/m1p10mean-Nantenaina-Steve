import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';
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
  validPassword = true;
  user: User = {
    ID: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
    validationEmail: false,
    access_token: '',
    cars: []
  }

	constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
  ) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  reinitPasswordError(formData: any){
    formData.form.controls['password'].setErrors({'isInvalid': null});
  }

  loginSubmit(formData: any){
    const mService = this.modalService;
    const nav = this.router;
    this.userService.login(this.user).pipe(take(1)).subscribe({
      next(value) {
        const token = JSON.parse(JSON.stringify(value));
        const user: User = {
          ID: token.user._id,
          firstname: token.user.firstname,
          lastname: token.user.lastname,
          email: token.user.email,
          password: '',
          type: token.user.type,
          validationEmail: token.user.validationEmail === '1',
          cars: [],
          access_token: token._id
        }
        for(let i=0; i < token.user.car.length; i++){
          user.cars.push({
            ID: token.user.car[i]._id,
            color: '',
            make: token.user.car[i].marque,
            model: token.user.car[i].model,
            vin: token.user.car[i].matricule,
            deposits: []
          });
          for(let j=0; j < token.user.car[i].deposit.length; j++){
            user.cars[i].deposits.push({
              ID: token.user.car[i].deposit[j]._id,
              state: token.user.car[i].deposit[j].State,
              payment: token.user.car[i].deposit[j].Paiement,
              createdAt: token.user.car[i].deposit[j].createdDate,
              updatedAt: token.user.car[i].deposit[j].updatedDate,
              repairs: []
            });
          }
        };
        const userToken = {
          _id: token._id,
          datePeremption: token.datePeremption,
          user: user
        }
        localStorage.setItem('user_token', JSON.stringify(userToken));
        mService.dismissAll();
        nav.navigate(['/admin']);
      },
      error(err) {
        if(err.error.message === "email"){
          alert("Veuillez confirmer votre adresse email en cliquant sur le lien que nous vous avons envoyé avant de continuer.")
        }
        if(err.error.message === "password"){
          formData.form.controls['password'].setErrors({'isInvalid': true});
        }
      },
      complete() {

      },
    });
  }

  signupSubmit(){
    this.userService.signup(this.user).pipe(take(1)).subscribe(data => {
      this.pageShown = 'signup-success';
    });
  }
}
