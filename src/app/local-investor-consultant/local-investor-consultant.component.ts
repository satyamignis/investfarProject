import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local-investor-consultant',
  templateUrl: './local-investor-consultant.component.html',
  styleUrls: ['./local-investor-consultant.component.css']
})
export class LocalInvestorConsultantComponent implements OnInit {
  preloadimg:any;

  constructor() { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
  }

}
