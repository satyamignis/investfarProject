import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-terms',
  templateUrl: './privacy-policy-terms.component.html',
  styleUrls: ['./privacy-policy-terms.component.css']
})
export class PrivacyPolicyTermsComponent implements OnInit {
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
