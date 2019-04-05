import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PropertyTypes } from '../services/property-types';
import { OfferTypes } from '../services/offer-types';
import { Features } from '../services/features';
import { PropertyAndOfferService } from '../services/property-and-offer.service';


@Component({
  selector: 'app-offer-type-sell',
  templateUrl: './offer-type-sell.component.html',
  styleUrls: ['./offer-type-sell.component.css']
})
export class OfferTypeSellComponent implements OnInit {
  apiLoading:any;
  preloadimg:any;
  params : any ;
  queryParams : any;
  propertyTypes = [];
  offerTypes = [];
  citiesOptions : any = [];
  features = [];
  filter : any = {};
  properties = [];
  loadMoreSpan = true;
  originalKey : any = '';
  currentUrl : any = '';
  ratingOptions = [ 
    { value : 0.5, text: '0.5'},
    { value : 1, text: '1'},
    { value : 1.5, text: '1.5'},
    { value : 2, text: '2'},
    { value : 2.5, text: '2.5'},
    { value : 3, text: '3'},
    { value : 3.5, text: '3.5'},
    { value : 4, text: '4'},
    { value : 4.5, text: '4.5'},
    { value : 5, text: '5'},
  ];
  to_from = [
    { value : 1, text: '1'},
    { value : 2, text: '2'},
    { value : 3, text: '3'},
    { value : 4, text: '4'},
    { value : 5, text: '5+'},
  ];
  totalCount = 0;
  scroll = false;
  years : any = [];
  constructor( 
    private activeRoute: ActivatedRoute,
    private apiService : ApiService,
    private router : Router,
    private propertyAndOfferService : PropertyAndOfferService) {

     this.activeRoute.params
    .subscribe((params) => {
      this.activeRoute.queryParams
      .subscribe((queryParams) => {
        this.queryParams = queryParams;
        this.params = params;
        this.originalKey = 'property_type';
        this.propertyTypes = PropertyTypes;
        this.offerTypes = OfferTypes;
        this.features = Features;
        this.currentUrl = this.router.url
        this.currentUrl = this.currentUrl.split('?')
        this.currentUrl = this.currentUrl[0]
        this.getCities();
        this.clearFilter();
        if(this.scroll){
          this.scrollToDiv();
        }
      })
    });

    }

  ngOnInit() {
     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
     this.years = this.apiService.getYears();

  }

  clearFilter(){
    this.filter = {
      property_type : 0,
      offer_type : 3,
      city : 0,
      // min_price : 0,
      // max_price : 0,
      from_bed_rooms : 0,
      to_bed_rooms : 0,
      from_bath_rooms : 0,
      to_bath_rooms : 0,
      from_rating : 0,
      to_rating : 0,
      // from_property_size : 0,
      // to_property_size : 0,
      from_year: 0,
      to_year : 0,
      // from_lot_size : 0,
      // to_lot_size : 0,
      // stories : 0,
      // condition : '',
      // garage_carport : 0,
      // pool : 0,
      // asking_price : 0,
      live : '',
      reason_of_selling : '',
      keyword : '',
      page_no : 1,
      limit : 10,
      feature: [],
      // home : ''
    };
    this.properties = [];
    this.loadMoreSpan = true;
    this.processParams();
    this.onSearch();
  }

  processParams(){
    let value : any = 0;

    // Process Params
    if(this.originalKey == 'offer_type'){
      value = this.propertyAndOfferService.getOfferTypeKeyValue(this.params.value, 'value');
    } else if(this.originalKey == 'property_type'){
      value = this.propertyAndOfferService.getPropertyKeyTypeValue('sell', 'value');
    } else {
      value = this.params.value;
    }
    this.filter[this.originalKey] = value;
    
    // Process Query Params
    for(let key in this.queryParams){
      let tempKey = key.replace(/-/g,'_');
      let tempValue : any = this.queryParams[key]
      if(tempKey == 'offer_type'){
        tempValue = this.propertyAndOfferService.getOfferTypeKeyValue(tempValue, 'value');
      } else if(tempKey == 'property_type'){
        tempValue = this.propertyAndOfferService.getPropertyKeyTypeValue(tempValue, 'value');
      } else if(tempKey == 'feature'){
        tempValue = [];
        tempValue = JSON.parse(this.queryParams[key])
      }
      this.filter[tempKey] = tempValue;
    }
  }


  getDetails(id){
      this.router.navigate(['/property/'+id]);
  }

  getFilterProperty(){
    let filtered_property_data : any = {};
    let length = 0;
    for (let key in this.filter) {
      if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null) {
        filtered_property_data[key] = this.filter[key];
        length++;
      }
    }
    return { filtered_property_data, length }
  }
  
  onSearch(){
    let filtered_property_data = this.getFilterProperty().filtered_property_data;
    for (let key in this.filter) {
      if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null) {
        filtered_property_data[key] = this.filter[key];
        if(key == 'feature'){
          filtered_property_data[key] = JSON.stringify(this.filter[key]);
          filtered_property_data[key] = filtered_property_data[key].replace('[','').replace(']','');
        }  
      }
    }
    // console.log(filtered_property_data)
    this.apiLoading=true;
    this.apiService.apiPostData('get_filtered_property', filtered_property_data)
      .subscribe(
        (response : any) => {
          //console.log(response)
          if(response.errorCode == '0'){
            // if(response.data.length == 0) this.loadMoreSpan = false;
            this.properties = [...this.properties, ...response.data];
            this.totalCount = response.total_count;
            if(this.properties.length == this.totalCount){
              this.loadMoreSpan = false;
            }
          } else {
            console.log('Get Error')
          }
          this.apiLoading=false;
        },
        (error: any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
  }  
  
  onChange(){
    console.log('on change')
    let queryParams = {}
    for (let key in this.filter) {
      if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null){
        if(key != this.originalKey.toLowerCase() && key != 'page_no' && key != 'limit'){
          let newKey = key.replace(/_/g, '-')
          let newValue = this.filter[key]
          if(newKey == 'offer-type'){
            newValue = this.propertyAndOfferService.getOfferTypeKeyValue(newValue, 'key')
          }
          if(newKey == 'property-type'){
            newValue = this.propertyAndOfferService.getPropertyKeyTypeValue(newValue, 'key')
          }
          if(newKey == 'feature'){
            newValue = JSON.stringify(this.filter[newKey])
          }
          queryParams[newKey] = newValue
        }
      } 
    }
    this.scroll = true;
    this.router.navigate([this.currentUrl], { queryParams: queryParams});
  }

  onClear(){
    this.router.navigate([this.currentUrl]);
  }

  featureChange(value, checked, index){
    console.log(value, checked, index)
    console.log(this.filter.feature)
    if(!checked){
      this.filter.feature.push(value)
    } else {
      this.filter.feature.splice(index, 1)
    }
    this.onChange()
  }

  loadMoreProperties(){
    this.loadMoreSpan = true;
    this.filter.page_no++;
    this.onSearch();
  }
  
  scrollToDiv(){
    setTimeout(() => {
      let structure = document.getElementById('structure');
      structure.scrollIntoView()
    }, 500);
  }

  getCities(){
    this.apiService.apiPostData('available_in_this_cities', {})
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          this.citiesOptions = response.data;
          this.citiesOptions = this.citiesOptions.filter((c) => c.city != null);
        } else {
          console.log('------error-------')
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}


