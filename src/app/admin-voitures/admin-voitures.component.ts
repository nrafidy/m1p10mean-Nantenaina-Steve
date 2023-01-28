import { Component } from '@angular/core';
import { faScrewdriverWrench, faTabletScreenButton, faVialCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AdminRepairComponent } from '../admin-repair/admin-repair.component';
import { Car } from '../models/Car.model';

@Component({
  selector: 'app-admin-voitures',
  templateUrl: './admin-voitures.component.html',
  styleUrls: ['./admin-voitures.component.scss']
})
export class AdminVoituresComponent {
  cars: Car[] = [];
  isCollapsed = true;

  faDiag = faTabletScreenButton;
  faRep = faScrewdriverWrench;
  faEnt = faVialCircleCheck;

  constructor(private offCanvasService: NgbOffcanvas){}

  openRepair(car: Car, carIndex: number){
    const offcanvasRef = this.offCanvasService.open(AdminRepairComponent, { position: 'end' });
		offcanvasRef.componentInstance.car = car;
		offcanvasRef.componentInstance.carIndex = carIndex;
  }

  collect(car: Car){

  }

  ngOnInit(){
    const userToken = JSON.parse(localStorage.getItem('user_token') as string);
    console.log(userToken.user.cars);
    this.cars = userToken.user.cars;
  }
}
