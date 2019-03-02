import { Injectable } from '@angular/core';
import { Router, NavigationEnd,CanActivate } from '@angular/router';
import { MyCookieService } from './my-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UnAuthGaurdService implements CanActivate {

  constructor(
    private myCookieService : MyCookieService,
    private router : Router
  ) { }

  canActivate() { 
    if(this.myCookieService.checkCookie('user')){
      this.router.navigate(['/']); 
    } else{
      return true;
    }     
  }
}