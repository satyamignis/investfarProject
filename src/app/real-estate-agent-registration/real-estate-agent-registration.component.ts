import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-estate-agent-registration',
  templateUrl: './real-estate-agent-registration.component.html',
  styleUrls: ['./real-estate-agent-registration.component.css']
})
export class RealEstateAgentRegistrationComponent implements OnInit {
  preloadimg:any;

  constructor() { }

  ngOnInit() {
	window.scrollTo(0, 0);
		/*$(".toggle-open").slideToggle(0);
    $(".toggle-click").click(function(){
        $(".toggle-open").slideToggle(1000);
    });*/


       this.preloadimg=true;
       setTimeout(() => {  
           this.preloadimg=false;
       }, 1000);
  }

}
