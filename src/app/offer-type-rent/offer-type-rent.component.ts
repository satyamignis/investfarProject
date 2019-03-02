import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-type-rent',
  templateUrl: './offer-type-rent.component.html',
  styleUrls: ['./offer-type-rent.component.css']
})
export class OfferTypeRentComponent implements OnInit {
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
