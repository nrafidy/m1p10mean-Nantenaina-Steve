import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrls: ['./admin-topnav.component.scss']
})
export class AdminTopnavComponent {
  faUser = faUser;
}
