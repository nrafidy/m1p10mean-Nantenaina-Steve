import { Component } from '@angular/core';
import { faPhoneVolume, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faPhoneVolume = faPhoneVolume;
  faLocationDot = faLocationDot;

  isMenuCollapsed = true;
}
