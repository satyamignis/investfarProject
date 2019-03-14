import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {
  preloadimg:any;
  activeTab:any = '1';
  user : any;
  companies = [];
  properties = [];
  property_cities = [];
  company_cities = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'city',
    textField: 'city',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
    enableCheckAll: false
  };
  selectedCities : any = [];
  apiLoading:any;

  constructor(
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
    this.user = this.myCookieService.getCookie('user');
    this.getFavourites('1'); // properties
    if(this.user.registrationType == 1){
      this.getFavourites('2'); // companies
    }
    this.getCities();
  }

  changeActiveTab(value){
    this.activeTab = value;
  }

  getFavourites(vendorType){
    let favoritesData : any = {
      serviceKey: this.user.serviceKey, 
      userId: this.user.userId,
      vendorType: vendorType
    };
    if(this.selectedCities.length > 0){
      favoritesData.city_arr = '';
      for(let c of this.selectedCities){
        favoritesData.city_arr += c + ',';
      }
      favoritesData.city_arr = favoritesData.city_arr.slice(0, -1);
    }
    this.apiLoading=true;
    this.apiService.apiPostData('getFavourite', favoritesData)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.errorCode == '0') {
            if(vendorType == '1'){
              this.properties = response.data;
            } else if ( vendorType == '2'){
              this.companies = response.data;
            }
          } else {
            this.toastr.error(response.errorMsg, 'Try Agian');
          }
          this.apiLoading=false;
        },
        (error: any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
  }

  getColor(avgRating){
    let color = 'default';
    if(avgRating > 0) {
      color = 'ok';
    }
    return color;
  }

  unFavourite(data){
      let favouriteData : any = {
        serviceKey : this.user.serviceKey,
        userId : this.user.userId,
        favourite : 2,
        vendorType : this.activeTab
      }
      if(this.activeTab == '1'){
        favouriteData.vendorId = data.propertyId;
      } else if (this.activeTab == '2'){
        favouriteData.vendorId = data.companyId;
      }
      this.apiService.apiPostData('favourite', favouriteData)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.errorCode == '0') {
            this.toastr.success(response.errorMsg, 'Success');
            this.getFavourites(this.activeTab);
          } else {
            this.toastr.error(response.errorMsg, 'Try Agian');
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getCities(){
    this.apiService.apiPostData('getCityOfFavContent',{
      userId: this.user.userId,
    })
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.errorCode == '0') {
          this.company_cities = response.company_city;
          this.property_cities = response.property_city
        } else {
          this.toastr.error(response.errorMsg, 'Try Again');
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  onSelect(event){
    console.log(this.selectedCities);
    this.getFavourites(this.activeTab);
  }

  onDeSelect(event){
    console.log(this.selectedCities);
    this.getFavourites(this.activeTab);
  }
}

