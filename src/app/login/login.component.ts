import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { MyCookieService } from '../services/my-cookie-service';
import { RoutingStateService } from '../services/routing-state.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import * as CountryCode from '../../assets/country-code.json';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
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
  previousRoute : any;
  fileName: string;
  filePreview: string;
  preloadimg:any;
  loginSuccess:any;
  loginData:any= {email:'',password:'',deviceType: 'Web', serviceKey: this.api.getservicesKey(), fcmToken: 'c81e728d9d4c2f636f067f89cc14862c'};
  signupData:any={};
  apiLoading:any;
  registerForm:any;
  submitted:any;
  rememberMe:any = false;
  rememberMeCookie:any;
  userRememberMe:any;

  closeResult: string;
  loginForm : FormGroup;
  forgotForm : FormGroup;
  socialUser: SocialUser;
  socialType = '0';
  callApi = false;

  constructor(
    private api:ApiService,
    private myCookieService : MyCookieService,
    private router : Router,
    private routingStateService : RoutingStateService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.previousRoute = this.routingStateService.getPreviousUrl();
    window.scrollTo(0, 0);
    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);
    /*Register validation init*/

    this.userRememberMe = JSON.parse(this.myCookieService.getCookie('rememberMe'));
    if(this.userRememberMe.rememberMe){
      this.loginData.email= this.userRememberMe.username;
      this.loginData.password=this.userRememberMe.password;
      this.rememberMe=this.userRememberMe.rememberMe;
    }  


    this.previousRoute = this.routingStateService.getPreviousUrl();
    //console.log('is previousRoute', this.previousRoute  );
    this.getSocialUser();

    this.companyType = 1;
    this.getCurrentLocation();
  }

  doLogin(){
    this.apiLoading=true;
    this.api.apiPostData('login',this.loginData)
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0' || response.errorCode == '3'){
          //console.log(response.data[0]);

          /*%%%%%%%%%%%%%%%%%%% Remember Me %%%%%%%%%%%%%%%%%%*/
          if(this.rememberMe){
            this.rememberMeCookie = {'username':this.loginData.email, 'password':this.loginData.password,'rememberMe':this.rememberMe};
            this.myCookieService.setForgotCookie('rememberMe', this.rememberMeCookie);
          }
          /* ////////////////////////////////////////////////*/

          this.setCookieAndNavigate(response.data[0]);
          this.toastr.success(response.errorMsg,'Success');
        } else {
          this.toastr.error(response.errorMsg, 'Try Again');
        }
        this.apiLoading=false;
      },
      (error: any) => {
        console.log(error);
        this.apiLoading=false;
      }
      )
  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialType = '1';
    this.callApi = true;
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
    this.socialType = '2';
    this.callApi = true;
  }

  getSocialUser(){
    this.authService.authState.subscribe((user : any) => {
      this.socialUser = user;
      if(this.callApi) this.socialLoginApiCall();
    })
  }

  socialLoginApiCall(){
    let socialLoginData = {
      serviceKey : this.api.getservicesKey(),
      deviceType : 'Web',
      registrationType : '1',
      socialId : this.socialUser.id,
      socialType : this.socialType,
      firstName : this.socialUser.firstName,
      lastName : this.socialUser.lastName,
      email : this.socialUser.email ? this.socialUser.email : '',
      profileImage : this.socialUser.email ? this.socialUser.photoUrl : ''
    }
    //console.log(socialLoginData)
    this.api.apiPostData('socialLogin', socialLoginData)
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0' || response.errorCode == '3'){
          //console.log(response.data[0]);
          this.setCookieAndNavigate(response.data[0])
        } else {
          this.toastr.error(response.errorMsg, 'Try Again');
        }
      },
      (error: any) => {
        console.log(error);
      }
      )
  }


  setCookieAndNavigate(user){
    this.myCookieService.setCookie('user', user);
    //   if(this.previousRoute.includes('/property') 
    //     || this.previousRoute.includes('/pricing')
    //     || this.previousRoute.includes('/valuation-request-form')
    //     || this.previousRoute.includes('/local-investor-consultant')){
    //     this.router.navigate([this.previousRoute]);
    // } else {
    this.router.navigate(['/']);
    //}
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
      //console.log('zipcode :: ',c.long_name)
      this.registrationForm.patchValue({zipcode : c.long_name})
    }
  }
}

getCurrentLocation(){
  this.api.getCurrentIpLocation()
  .subscribe(
    (response : any) => {
      this.currentCountry = response.country
      //console.log(this.currentCountry)
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
  })  
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
    registrationData.append('serviceKey', this.api.getservicesKey());
    registrationData.append('registrationType', this.registrationType);
    registrationData.append('companyType', this.companyType.toString());
    this.api.apiPostData('register', registrationData)
    .subscribe(
      (response : any) => {
        //console.log(response)
        if(response.errorCode == '0'){
          this.toastr.success(response.errorMsg, 'Success');
          this.myCookieService.setCookie('user', response.data[0]);
          this.router.navigate(['/bank-detail']);
        } else {
          this.toastr.error(response.errorMsg, 'Try Again');
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
