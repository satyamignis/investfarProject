import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investfar',
  templateUrl: './investfar.component.html',
  styleUrls: ['./investfar.component.css']
})
export class InvestfarComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  constructor() { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
  }

}
