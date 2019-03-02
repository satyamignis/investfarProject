import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoutingStateService {

  private history = [];
  constructor(
    private router: Router
  ) { }

  loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  getHistory(): string[] {
    return this.history;
  }

  getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/index';
  }

  checkRoutes(url){
    let previousRoute = this.history[this.history.length - 1] || '/index';
    if(previousRoute.includes('/login') 
       || previousRoute.includes('/choose-form') 
       || previousRoute.includes('/company-registration')
       || previousRoute.includes('/normal-user') 
       || previousRoute.includes('/contractor-registration')){
			this.router.navigate([url]);
		}
  }

}
