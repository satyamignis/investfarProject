import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

declare const $: any;

@Component({
  selector: 'app-companies-registration',
  templateUrl: './companies-registration.component.html',
  styleUrls: ['./companies-registration.component.css']
})
export class CompaniesRegistrationComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

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

  handleAddressChange(address: any) {
    // console.log('----------address', address);
    // this.address.address = address.formatted_address;
    // this.address.latitude = address.geometry.location.lat();
    // this.address.longitude = address.geometry.location.lng();
  }

}
