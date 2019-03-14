import { Component, OnInit } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';

@Component({
  selector: 'app-local-investor-consultant',
  templateUrl: './local-investor-consultant.component.html',
  styleUrls: ['./local-investor-consultant.component.css']
})
export class LocalInvestorConsultantComponent implements OnInit {
  preloadimg:any;
  user:any;
  constructor(private myCookieService:MyCookieService) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

    this.user = this.myCookieService.getCookie('user');
  }


}
