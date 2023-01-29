import { Component, OnInit, OnDestroy } from '@angular/core';
import { faScrewdriverWrench, faTabletScreenButton, faVialCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, take } from 'rxjs';
import { AdminRepairComponent } from '../admin-repair/admin-repair.component';
import { Car } from '../models/Car.model';
import { CarService } from '../services/car/car.service';
import { DepositService } from '../services/deposit/deposit.service';
import { LocalStorageService } from '../services/localstorage/localstorage.service';

@Component({
  selector: 'app-admin-voitures',
  templateUrl: './admin-voitures.component.html',
  styleUrls: ['./admin-voitures.component.scss']
})
export class AdminVoituresComponent implements OnInit, OnDestroy{
  cars: Car[] = [];
  storageSub!: Subscription;
  isCollapsed = true;
  search = '';

  faDiag = faTabletScreenButton;
  faRep = faScrewdriverWrench;
  faEnt = faVialCircleCheck;

  constructor(
    private offCanvasService: NgbOffcanvas,
    private lService: LocalStorageService,
    private carService: CarService,
    private depositService: DepositService
  ){}

  openRepair(car: Car, carIndex: number){
    const offcanvasRef = this.offCanvasService.open(AdminRepairComponent, { position: 'end' });
		offcanvasRef.componentInstance.carIndex = carIndex;
  }

  setCars(){
    const user = JSON.parse(localStorage.getItem('user_token') as string).user;
    let lCars: Car[] = JSON.parse(localStorage.getItem('user_token') as string).cars;
    if(!lCars){
      if(user.type === 'res_atelier' || user.type === 'res_finance'){
        this.carService.getCars().pipe(take(1)).subscribe((val) => {
          lCars = [];
          console.log(val);
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
          this.cars = lCars;
          localStorage.setItem('cars', JSON.stringify(lCars));
        });
      }
      if(user.type === 'client'){
        this.carService.getCarsByUser(user).pipe(take(1)).subscribe((val) => {
          lCars = [];
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
          this.cars = lCars;
          localStorage.setItem('cars', JSON.stringify(lCars));
        });
      }
    } else {
      this.cars = lCars;
    }
  }

  ngOnInit(){
    this.setCars();
    this.storageSub = this.lService.watchStorage().subscribe((val) => this.setCars());
  }

  ngOnDestroy(){
    this.storageSub.unsubscribe();
  }
}
