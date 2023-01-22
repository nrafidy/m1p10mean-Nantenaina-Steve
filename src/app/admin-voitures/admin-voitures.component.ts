import { Component } from '@angular/core';
import { faScrewdriverWrench, faTabletScreenButton, faVialCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AdminRepairComponent } from '../admin-repair/admin-repair.component';

@Component({
  selector: 'app-admin-voitures',
  templateUrl: './admin-voitures.component.html',
  styleUrls: ['./admin-voitures.component.scss']
})
export class AdminVoituresComponent {
  isCollapsed = true;

  faDiag = faTabletScreenButton;
  faRep = faScrewdriverWrench;
  faEnt = faVialCircleCheck;

  constructor(private offCanvasService: NgbOffcanvas){}

  openRepair(id: string){
    const offcanvasRef = this.offCanvasService.open(AdminRepairComponent, { position: 'end' });
		offcanvasRef.componentInstance.repairID = id;
  }
}
