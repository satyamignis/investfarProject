import { Component, OnInit, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-owner-financed-no-banks-needed',
  templateUrl: './owner-financed-no-banks-needed.component.html',
  styleUrls: ['./owner-financed-no-banks-needed.component.css']
})
export class OwnerFinancedNoBanksNeededComponent implements OnInit {

    imageUrlArray:any;
    preloadimg:any;

    constructor() {
        this.imageUrlArray=[
        './assets/images/thumb-slider/financed-slide01.jpg',
        './assets/images/thumb-slider/financed-slide02.jpg',
        './assets/images/thumb-slider/financed-slide03.jpg',
        './assets/images/thumb-slider/financed-slide04.jpg'
        ];

         this.preloadimg=true;
         setTimeout(() => {  
             this.preloadimg=false;
         }, 1000);
    }

	ngOnInit() {
	  	window.scrollTo(0, 0);
	}

    changerImage(param){
        this.slideshow.goToSlide(param);
    }

    @ViewChild('slideshow') slideshow:any;

}
