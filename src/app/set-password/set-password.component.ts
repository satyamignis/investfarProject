import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
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
