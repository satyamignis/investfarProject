import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { Features } from '../services/features';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compare-property',
  templateUrl: './compare-property.component.html',
  styleUrls: ['./compare-property.component.css']
})
export class ComparePropertyComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  properties : any = [];
  filteredFeatures : any = [];
  features = Features;
  propertyId : any = '';
  differenceOnly = false;

  propertyListArr:any = [
  { 'value' : 1, 'text' : 'Condo' },
  { 'value' : 2, 'text' : 'Plot' },
  { 'value' : 3, 'text' : 'Single Family' },
  { 'value' : 4, 'text' : 'Multi Family' },
  { 'value' : 5, 'text' : 'Apartment' },
  { 'value' : 6, 'text' : 'Duplex' },
  { 'value' : 7, 'text' : 'Office' },
  { 'value' : 8, 'text' : 'Townhouse' },
  ]


  offerListArr:any = [
  { 'value' : 1, 'text' : 'Buy' },
  { 'value' : 2, 'text' : 'Rent' },
  { 'value' : 3, 'text' : 'Sell' },
  { 'value' : 4, 'text' : 'Sold' },
  ]

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private myCookieService: MyCookieService,
    private myToasterService: ToastrService,
    ) {
    this.activeRoute.params
    .subscribe((params) => {
      // console.log(params) 
      this.propertyId = params.title
    });
  }

  ngOnInit() {
  	window.scrollTo(0, 0);
  	this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);
    this.getComparePropertyDetails();
  }

  getComparePropertyDetails() {
    let getComparePropertyDetailsData = {
      slug_name: this.propertyId,
    }
    this.apiLoading=true;
    this.apiService.apiPostData('compare_property', getComparePropertyDetailsData)
    .subscribe(
      (response: any) => {
        if (response.errorCode == '0') {
          this.properties = response.data;
          this.properties = this.properties.sort((a,b) => a.price - b.price);
          for(let p of this.properties){
            let f = this.features
            f = f.filter((f) => {
              return p.feature.includes(f.value.toString());
            })
            this.filteredFeatures.push(f);
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

  checkDifference(key){
    if(this.differenceOnly){
      let counts = [];
      let countLength = 0;
      for(let i = 0; i < this.properties.length; i++){
        if(counts[this.properties[i][key]] === undefined) {
          counts[this.properties[i][key]] = 1;
          countLength++;
        } 
      }
      if(countLength == 1){
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  getPropertyName(propertyVal){
    for (let i = 0; i < this.propertyListArr.length; i++) {
      if(this.propertyListArr[i].value == propertyVal){
        return this.propertyListArr[i].text;
      }
    }
  }

  getOfferName(offerVal){
    for (let i = 0; i < this.offerListArr.length; i++) {
      if(this.offerListArr[i].value == offerVal){
        return this.offerListArr[i].text;
      }
    }
  }

}
