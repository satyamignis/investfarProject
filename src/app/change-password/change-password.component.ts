import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
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
