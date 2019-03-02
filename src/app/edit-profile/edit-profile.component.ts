import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  preloadimg:any;
  constructor() { }

  ngOnInit() {
  this.preloadimg=true;
        setTimeout(() => {  
           this.preloadimg=false;
        }, 1000);
  }
}
