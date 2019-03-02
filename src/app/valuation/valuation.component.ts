import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {
  preloadimg:any;

  constructor() { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
     this.preloadimg=true;
     setInterval(() => {  
         this.preloadimg=false;
     }, 1000);
  }

}
