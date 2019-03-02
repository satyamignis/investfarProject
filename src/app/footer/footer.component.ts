import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	 
	scrollTOElement(){
	    const toElement = $('#topBody');
	    const focusElement = $('#topBody');
	    const offset = 0;
	    const speed = 800 * 1 || 500;
	    $('html, body').animate({
	      scrollTop: toElement.offset().top + offset
	    }, speed);
	    if (focusElement) {
	      $(focusElement).focus();
	    }
	}
}
