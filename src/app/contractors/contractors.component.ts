import { Component, OnInit } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';


@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {
  preloadimg:any;
  user:any;
  constructor(private myCookieService: MyCookieService) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

     this.user = this.myCookieService.getCookie('user');

  }

}
