import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import { PropertyTypes } from '../services/property-types';
import { OfferTypes } from '../services/offer-types';
import * as CountryCode from '../../assets/country-code.json';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
  styleUrls: ['./filter-property.component.css']
})
export class FilterPropertyComponent implements OnInit {
  countryCode = (<any>CountryCode).countries;
  numVisible = 0;
  propertyTypes = [];
  offerTypes = [];
  citiesOptions = [];
  filter : any = {};
  user:any;
  properties = [];
  totalCount = 0;
  cities : any = [];
  years : any = [];
  eur:any=1;
  readMore:any;
  showfilterpro:any;
  apiLoading:any;

  constructor(
    private api:ApiService,
    private router : Router,
  	) { }

  ngOnInit() {
  	 this.propertyTypes = PropertyTypes;
    this.offerTypes = OfferTypes;
    this.clearFilter(); 
    this.getCities();
  }

  // %%%%%%%%%filter start%%%%%%%%%%%%
  onReadMore(iselement){
    this.readMore=iselement;
  }

  getCities(){
    this.api.apiPostData('available_in_this_cities', {})
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          this.cities = response.data;
          this.cities = this.cities.filter((c) => c.city != null);
          if(response.data.length > 6){
            this.numVisible = 6
          } else {
            this.numVisible = response.data.length;
          }
        } else {
          console.log('Error')
        }
      },
      (error: any) => {
        console.log(error);
      }
      )
  }

  onSearch(type){

    if(type == 'btn'){
      this.properties = [];
    }
    let filtered_property_data = this.getFilterProperty().filtered_property_data;
    for (let key in this.filter) {
      if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null) 
        filtered_property_data[key] = this.filter[key]
    }
    this.apiLoading=true;
    this.showfilterpro=true;
    this.api.apiPostData('get_filtered_property', filtered_property_data)
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          this.properties = [...this.properties, ...response.data];
          this.totalCount = response.total_count;
          if(this.properties.length == this.totalCount){
          } 
          if(type == 'btn'){ this.scrollToDiv();}
        } else {
          console.log('Error')
        }
        this.apiLoading=false;

      },
      (error: any) => {
        console.log(error);
      }
      )
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


  clearFilter(){
    this.filter = {
      property_type : 0,
      offer_type : 0,
      city : '',
      //min_price : 0,
      //max_price : 0,
      from_bed_rooms : 0,
      to_bed_rooms : 0,
      from_bath_rooms : 0,
      to_bath_rooms : 0,
      from_rating : 0,
      to_rating : 0,
      from_year: 0,
      to_year : 0,
      live : '',
      reason_of_selling : '',
      keyword : '',
      page_no : 1,
    };

    this.eur=0;//we can work on a exchange converter later.;

    this.properties = [];
    //this.apiLoading=true;
    //this.onSearch('');
  }

  loadMoreProperties(){
    this.apiLoading=true;
    this.filter.page_no++;
    this.onSearch('');
  }

  scrollToDiv(){
    //let structure = document.getElementById('structure');
    //structure.scrollIntoView()
  }

  scrollToSearch(){
    //let search = document.getElementById('searchDiv');
    //search.scrollIntoView()
  }

}



