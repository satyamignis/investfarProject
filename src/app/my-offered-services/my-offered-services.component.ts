import { Component, OnInit } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-my-offered-services',
  templateUrl: './my-offered-services.component.html',
  styleUrls: ['./my-offered-services.component.css']
})
export class MyOfferedServicesComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  user:any;
  myOfferedServices:any;
  constructor(
     private myCookieService : MyCookieService,
     private apiService : ApiService,
     private toastr : ToastrService
    ) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

    this.user = this.myCookieService.getCookie('user');
    this.getMyOfferService();
  }

   getMyOfferService(){
    this.apiLoading=true;
    this.apiService.apiPostData('offeredServices', {
      userId : this.user.userId,
      serviceKey: this.user.serviceKey
    })
      .subscribe(
        (response : any) => {
          console.log(response);
          if(response.errorCode == '0'){
            this.myOfferedServices = response.data;
          } else {
            this.toastr.error('Error', response.errorMsg);
          }
          this.apiLoading=false;
          
        },
        (error : any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
  }

}
