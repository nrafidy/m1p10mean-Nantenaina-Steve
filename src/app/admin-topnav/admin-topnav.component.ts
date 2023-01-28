import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/User.model';
import { Car } from '../models/Car.model';
import { UserService } from '../services/user/user.service';
import { Appconfig } from '../interfaces/appconfig.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../appconfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { CarService } from '../services/car/car.service';
import { DepositService } from '../services/deposit/deposit.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrls: ['./admin-topnav.component.scss']
})
export class AdminTopnavComponent {
  faUser = faUser;
  files: File[] = [];
  currentUser!: User;
  addCar: Car = {
    ID: '',
    color: '',
    make: '',
    model: '',
    vin: '',
    deposits: []
  };

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private modalService: NgbModal,
    private userService: UserService,
    private carService: CarService,
    private depService: DepositService,
    private router: Router
  ) {}

  ngOnInit(){
    this.currentUser = this.userService.getUserFromLocalStorage();
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  submitCar(){
    const dService = this.depService;
    const mService = this.modalService;
    const r = this.router;
    let userToken = JSON.parse(localStorage.getItem('user_token') as string);
    this.carService.addCar(this.addCar).pipe(take(1)).subscribe({
      next(value) {
        const res = JSON.parse(JSON.stringify(value));
        const car: Car = {
          ID: res.car._id,
          color: '',
          make: res.car.marque,
          model: res.car.model,
          vin: res.car.matricule,
          deposits: []
        }
        dService.addDeposit(car).pipe(take(1)).subscribe({
          next(value) {
            const deposit = JSON.parse(JSON.stringify(value)).deposit;
            car.deposits.push({
              ID: deposit._id,
              state: deposit.State,
              payment: deposit.Paiement,
              createdAt: deposit.createdDate,
              updatedAt: deposit.updatedDate,
              repairs: []
            });
            userToken.user.cars.push(car);
            localStorage.setItem('user_token', JSON.stringify(userToken));
            mService.dismissAll();
            r.navigate(['/admin/voitures']);
          },
          error(err) {
              console.log(err);
          },
        });
          console.log(value);
      },
      error(err) {
          console.log(err);
      },
      complete() {

      },
    });
  }
}
