import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

declare const $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  preloadimg:any;
  apiLoading:boolean;
  pricingList:any;
  constructor(
    private api:ApiService

  	) { }

  ngOnInit() {
  	this.getPricing();
  	window.scrollTo(0, 0);
  	this.accordionBox();
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
  }

   getPricing(){
        this.apiLoading=true;
        this.api.apiGetData('get_in_app_purchase')
        .subscribe(
        (response : any) => {
       
   if(response.errorCode == '0'){
          this.pricingList = response.data;
          for(let i = 0; i < this.pricingList.length; i++){
            this.pricingList[i].desc = this.pricingList[i].sub_title.replace('[','').replace(']', '').split(',');
            // console.log(this.pricingList[i].desc);
          }
          } else {
                 }
          this.apiLoading=false;
        },
        (error: any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
    }

  		//Accordion Box
  		accordionBox(){
		$(".accordion-box").on('click', '.acc-btn', function() {
			var target = $(this).parents('.accordion');
			if($(this).hasClass('active')!==true){
				$('.accordion .acc-btn').removeClass('active');
			}
			if ($(this).next('.acc-content').is(':visible')){
				return true;
			}else{
				$(this).addClass('active');
				$('.accordion').removeClass('active-block');
				$('.accordion .acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	

		$(".accordion-box").on('click', '.acc-btn.active', function() {
				$('.accordion .acc-btn').removeClass('active');
				$('.accordion .acc-content').slideUp(300);
		});


		}





}
