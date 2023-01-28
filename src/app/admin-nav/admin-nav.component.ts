import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faAnglesLeft, faAnglesRight, faCar, faDoorOpen, faFolder, faHouseChimney, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

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
  faLogout = faDoorOpen;

  constructor(private router: Router){}

  handleSidebarToggle = () => this.isExpanded = !this.isExpanded;

  logout(){
    localStorage.removeItem("user_token");
    this.router.navigateByUrl("/");
  }
}
