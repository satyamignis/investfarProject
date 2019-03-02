import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.css']
})
export class SubmitPropertyComponent implements OnInit {
  preloadimg:any;
  constructor() { }

  ngOnInit() {
  	window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);


     // toggle for form open
    $('.Show').click(function() {
    $('#target').show(500);
    $('.Show').hide(0);
    $('.Hide').show(0);
    });
    $('.Hide').click(function() {
        $('#target').hide(500);
        $('.Show').show(0);
        $('.Hide').hide(0);
    });
    $('.toggle').click(function() {
        $('#target').toggle('slide');
    });
  }

}
