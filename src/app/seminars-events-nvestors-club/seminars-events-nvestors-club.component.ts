import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seminars-events-nvestors-club',
  templateUrl: './seminars-events-nvestors-club.component.html',
  styleUrls: ['./seminars-events-nvestors-club.component.css']
})
export class SeminarsEventsNvestorsClubComponent implements OnInit {
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
