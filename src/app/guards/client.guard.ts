import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userToken = JSON.parse(localStorage.getItem('user_token') as string);
    if(userToken){
      if(new Date(userToken?.datePeremption) < new Date() || userToken?.user.type !== 'client'){
        localStorage.removeItem('user_token');
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
