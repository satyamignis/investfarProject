import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare const $: any;

@Component({
  selector: 'app-mls-property',
  templateUrl: './mls-property.component.html',
  styleUrls: ['./mls-property.component.css']
})
export class MlsPropertyComponent implements OnInit {
  url = '';
  title = '';
  params : any;
  preloadimg:any;
  apiLoading:any;
  propertyUrl : any = 'https://idxhome.com/homes/107543/'
  property = false;
  constructor(
    private router : Router,
    private activeRoute : ActivatedRoute,
    private sanitizer : DomSanitizer
  ) { 

 this.activeRoute.params.subscribe((params) => {
     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
     this.ngOnInit();
    })


  }

  ngOnInit() {
    //this.apiLoading=true;
    this.url = this.router.url;
    console.log(this.url);
    this.title = this.url.replace('/mls-property/','').replace(/-/g,' ');
    this.activeRoute.params.subscribe((params) => {
      this.params = params;
      console.log(this.params);
      if(this.params.listingAddress){
        this.propertyUrl = this.propertyUrl + this.params.boardId + '/' + this.params.listingAddress
          + '/' + this.params.listingNumber + '/';
        this.title = this.params.listingAddress.replace(/-/g,' ');
        this.propertyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.propertyUrl);
        this.property = true;
      }
      //this.apiLoading=false;

    })
  }
}
