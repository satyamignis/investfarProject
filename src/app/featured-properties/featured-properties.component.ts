import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-properties',
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css']
})
export class FeaturedPropertiesComponent implements OnInit {
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
