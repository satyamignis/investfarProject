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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
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

     //this.previousRoute = this.routingStateService.getPreviousUrl();
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
    console.log('---------previousRoute', this.previousRoute  );
    this.getSocialUser();

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerFormInt(){
  this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
  }

  onFileChanged(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        reader.result.split(',')[1];
        this.fileName = file.name + " " + file.type;
        this.filePreview = 'data:image/png' + ';base64,' + reader.result.split(',')[1];
        console.log(this.filePreview);
      };
    }
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
      console.log(socialLoginData)
      this.api.apiPostData('socialLogin', socialLoginData)
      .subscribe(
        (response : any) => {
          if(response.errorCode == '0' || response.errorCode == '3'){
           console.log(response.data[0]);
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
        this.router.navigate(['/']);
     }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    handleAddressChange(address: any) {
      // console.log('----------address', address);
      // this.address.address = address.formatted_address;
      // this.address.latitude = address.geometry.location.lat();
      // this.address.longitude = address.geometry.location.lng();
    }


  
}
