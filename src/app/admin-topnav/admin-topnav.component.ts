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
import { LocalStorageService } from '../services/localstorage/localstorage.service';


@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrls: ['./admin-topnav.component.scss']
})
export class AdminTopnavComponent {
  userType = '';
  faUser = faUser;
  files: File[] = [];
  currentUser!: User;
  addCar: Car = {
    ID: '',
    color: '',
    make: '',
    model: '',
    vin: '',
    deposits: [],
    userID: ''
  };

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: Appconfig,
    private http: HttpClient,
    private modalService: NgbModal,
    private userService: UserService,
    private carService: CarService,
    private depService: DepositService,
    private lService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(){
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.userType = JSON.parse(localStorage.getItem('user_token') as string).user.type;
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-login-title', centered: true });
	}

  submitCar(){
    const _cService = this.carService;
    const _router = this.router;
    const _mService = this.modalService;
    const _lService = this.lService;
    this.carService.addCar(this.addCar).pipe(take(1)).subscribe({
      next(v) {
        _cService.getCarsByUser(JSON.parse(localStorage.getItem('user_token') as string).user).pipe(take(1)).subscribe(val => {
          const lCars: Car[] = [];
          const value = JSON.parse(JSON.stringify(val));
          value.forEach((element: any) => {
            lCars.push({
              ID: element._id,
              color: '',
              make: element.marque,
              model: element.model,
              vin: element.matricule,
              userID: element.user,
              deposits: []
            });
          });
          _lService.setItem('cars', JSON.stringify(lCars));
          _mService.dismissAll();
          _router.navigate(['/admin/voitures']);
        });
      },
      error(err) {
          alert('Cette voiture existe deja');
          _mService.dismissAll();
          _router.navigate(['/admin/voitures']);
      },
      complete() {

      },
    });
  }
}
