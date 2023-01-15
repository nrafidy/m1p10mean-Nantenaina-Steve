import { Component, Inject, OnInit } from '@angular/core';
import { localStorageToken } from './localstorage.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'm1p10mean-Nantenaina-Steve';

  constructor(
    @Inject(localStorageToken) private localStorage: Storage
  ){}

  ngOnInit(): void {
    this.localStorage.setItem('access_token', '');
  }
}
