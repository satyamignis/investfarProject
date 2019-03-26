import { Component } from '@angular/core';
import { fadeAnimation } from './animations';
import { RoutingStateService } from './services/routing-state.service';
import { LocationStrategy } from '@angular/common';


declare const $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [fadeAnimation],
	host: {
		'(window:scroll)' : 'onWindowScroll($event)'
	},
})


export class AppComponent {

	constructor(private routingStateService: RoutingStateService) { 
		routingStateService.loadRouting();
	}
	
	title = 'app';
	user:any;

	onWindowScroll($event) {

		const number = window.pageYOffset;
		var screenwidth = window.innerWidth;
		var topScrolls = document.getElementById("scroll-to-target");

		if(number > 800){
			if($('#fadin-text').length){
				var f = document.getElementById("fadin-text");
				f.style.display="block";
			}
		}

		if(number>4250){
			if($('#progress-id').length){
				var f = document.getElementById("fadin-text-two");
				var f2 = document.getElementById("fadin-text-two2");
				f.style.display="block";
				f2.style.display="block";
			}
		}
		var d = document.getElementById("sticky-header-id");
		if(number > 150){
			topScrolls.style.display="block";
			if(screenwidth >768){
				d.style.display="block";
			}

			if($('#progress-id').length){
				document.getElementById("progress-id").style.position="sticky";
				document.getElementById("progress-id").style.width="90%";
				document.getElementById("progress-id70").style.position="sticky";
				document.getElementById("progress-id70").style.width="70%";
				document.getElementById("progress-id72").style.position="sticky";
				document.getElementById("progress-id72").style.width="72%";
			}

		} else{
			topScrolls.style.display="none";
			d.style.display="none";
		}
	}

}
