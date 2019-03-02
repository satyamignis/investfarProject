import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-type-sell',
  templateUrl: './offer-type-sell.component.html',
  styleUrls: ['./offer-type-sell.component.css']
})
export class OfferTypeSellComponent implements OnInit {
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
