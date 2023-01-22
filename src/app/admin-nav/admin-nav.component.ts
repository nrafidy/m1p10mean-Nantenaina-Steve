import { Component } from '@angular/core';
import { faAnglesLeft, faAnglesRight, faCar, faFolder, faHouseChimney, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {
  isExpanded = true;
  faHome = faHouseChimney;
  faCar = faCar;
  faMoney = faMoneyBill;
  faHistory = faFolder;
  faOpen = faAnglesRight;
  faClose = faAnglesLeft;

  handleSidebarToggle = () => this.isExpanded = !this.isExpanded;
}
