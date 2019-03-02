import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-home-improvement-network',
  templateUrl: './home-improvement-network.component.html',
  styleUrls: ['./home-improvement-network.component.css']
})
export class HomeImprovementNetworkComponent implements OnInit {
  preloadimg:any;

  constructor() { }

  ngOnInit() {
  	window.scrollTo(0, 0);
  	this.accordionBox();
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

			 this.preloadimg=true;
		     setTimeout(() => {  
		         this.preloadimg=false;
		     }, 1000);
		}

}
