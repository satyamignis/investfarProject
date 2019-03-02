import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MyCookieService } from './my-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    private myCookieService : MyCookieService,
    private router : Router
  ) { }

  canActivate() { 
    if(this.myCookieService.checkCookie('user')){
      return true;
    } else{
      this.router.navigate(['/login']); 
    }     
  }
}
