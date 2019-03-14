import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import * as CountryCode from '../../assets/country-code.json';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;


@Component({
  selector: 'app-companies-registration',
  templateUrl: './companies-registration.component.html',
  styleUrls: ['./companies-registration.component.css']
})
export class CompaniesRegistrationComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  countryCode = (<any>CountryCode).countries;
  companyType = 0;
  currentCountry = '';
  registrationForm : FormGroup;
  control : any;
  address : any = {};
  images :  any = [];
  imagePreview : any = [];
  registrationType = '2';
  defaultCertificate = 2;
  preloadimg:any;
  apiLoading:any;

  constructor( 
    private router : Router,
    private apiService : ApiService,
    private formBuilder : FormBuilder,
    private myToasterService: ToastrService,
    private myCookieService : MyCookieService) { }


  ngOnInit() {
  		window.scrollTo(0, 0);
        this.preloadimg=true;
        setTimeout(() => {  
           this.preloadimg=false;
        }, 1000);

    if(this.router.url.includes('companies-registration')){
      this.companyType = 1;
    } else if(this.router.url.includes('contractor-registration')) {
      this.companyType = 2;
    } else if(this.router.url.includes('real-estate-agent-registration')) {
      this.companyType = 3;
    }
    this.getCurrentLocation();
  }

  citiesGet(){
    if(this.registrationForm.value['moreCities']){
      $('.Morecities').hide('slow');

    }else{
      $('.Morecities').show('slow');
    }
  }


 handleAddressChange(address : any){
    this.address.address = address.formatted_address;
    this.address.latitude = address.geometry.location.lat()
    this.address.longitude = address.geometry.location.lng()
    for(let c of address.address_components){
      if(JSON.stringify(c.types).includes('postal_code')){
        console.log('zipcode :: ',c.long_name)
        this.registrationForm.patchValue({zipcode : c.long_name})
      }
    }
  }
  
  getCurrentLocation(){
    this.apiService.getCurrentIpLocation()
    .subscribe(
      (response : any) => {
        this.currentCountry = response.country
        console.log(this.currentCountry)
        },
        (error: any) => {
          console.log(error);
        }
      )

      this.createForm();
  }
  
  createForm(){
    this.registrationForm = this.formBuilder.group({
      companyName : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      website : [''],
      countryCode : [this.currentCountry, Validators.required],
      number : ['', Validators.required],
      addr : [''],
      city : ['', Validators.required],
      state: ['', Validators.required],
      zipcode : ['', Validators.required],
      moreCities : [false, Validators.required],
      registered_as : ['1', Validators.required],
      isCertified : [true, Validators.required],
      password: ['', Validators.required],
      //add_more_city_state : this.formBuilder.array([])
    })  
    //console.log(this.registrationForm.value)
    //this.control = <FormArray>this.registrationForm.controls.add_more_city_state;
    //this.createItem();
  }

  createItem() {
    this.control.push(
      this.formBuilder.group({
        city: ['', Validators.required],
        state: ['', Validators.required]
      }))
  }

  get f() { return this.registrationForm.controls; }

  onSubmit(){
    if(this.isFormValid()){
      this.apiLoading=true;
      let registrationData =  new FormData();
      for(let key in this.registrationForm.value){
        if(key == 'add_more_city_state'){
          registrationData.append(key, JSON.stringify(this.registrationForm.value[key]));
        } else {
          registrationData.append(key, this.registrationForm.value[key]);
        }
      }
      for(let key in this.address){
        registrationData.append(key, this.address[key])
      }
      if(!this.registrationForm.value.isCertified){
        let i = 0;
        for(let img of this.images){
          i++;
          let key = 'documenet' + 1;
          registrationData.append(key, img)
        }
      }
      registrationData.append('phoneNo', this.getDailingCode(this.registrationForm.value.countryCode) + '-' + this.registrationForm.value.number)
      registrationData.append('deviceType', 'Web');
      registrationData.append('serviceKey', this.apiService.getservicesKey());
      registrationData.append('registrationType', this.registrationType);
      registrationData.append('companyType', this.companyType.toString());
      this.apiService.apiPostData('register', registrationData)
      .subscribe(
        (response : any) => {
          console.log(response)
          if(response.errorCode == '0'){
            this.myToasterService.success(response.errorMsg, 'Success');
            this.myCookieService.setCookie('user', response.data[0]);
            this.router.navigate(['/bank-detail']);
           } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
           }
           this.apiLoading=false;
        },
        (error: any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
    }
    
  }

  isFormValid(){
    let flag = false;
    if(this.registrationForm.valid && this.address.address){
      if(!this.registrationForm.value.isCertified){
        if(this.images.length > 0){
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = true;
      }
    }
    return flag
  }

  moreCitiesCheck(){
    if(this.control.length == 0 && this.registrationForm.value.moreCities){
      this.createItem()
    } else {
      this.deleteControls();
    }
  }

  deleteControls(){
    if(this.control.length > 0){
      this.control.removeAt(0);
      this.deleteControls();
    }
  }

  onImageFile(files){
    for(let f of files){
      if(this.images.length < this.defaultCertificate && f.type.includes('image')){
        this.images.push(f)    
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imagePreview.push(event.target.result);
        }
        reader.readAsDataURL(f);
      }
    }
  }

  getDailingCode(value){
    let callingCode = ''
    for(let c of this.countryCode){
      if(c.code == value){
        callingCode = c.callingCode
      }
    }
    return callingCode;
  }

  imageCheck(){
    if(this.registrationForm.value.isCertified){
      this.images = [];
      this.imagePreview = [];
    }
  }

  deleteImage(index){
    this.images.splice(index,1)
    this.imagePreview.splice(index,1)
  }
}
