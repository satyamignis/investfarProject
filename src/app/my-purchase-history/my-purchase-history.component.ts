import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import alertify from 'alertify.js';


@Component({
  selector: 'app-my-purchase-history',
  templateUrl: './my-purchase-history.component.html',
  styleUrls: ['./my-purchase-history.component.css']
})
export class MyPurchaseHistoryComponent implements OnInit {
  preloadimg:any;
  purchaseDetails : any;
  user:any;
  errorMsg:any;
  recurringActive:any;
  apiLoading:any;

  constructor(  
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private profileService : ProfileService,
    private myToasterService:ToastrService,
    ) { }

  ngOnInit() {
    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);

    this.user = this.myCookieService.getCookie('user');
    this.getPurchaseHistory();
    this.getrecurringUser();
  }


  getrecurringUser(){
    this.apiService.addCardRecurring('get_from_email',{'email':this.user.email})
    .subscribe(
      (responseResult : any) => {
        if((responseResult.data).length >0){
          this.recurringActive=true;
        }else{
          this.recurringActive=false;
        }
      })
  }

  updaterecurringUser(){
    this.apiLoading = true;
    this.apiService.addCardRecurring('change_reccurring_status',{'email':this.user.email})
    .subscribe(
      (responseResult : any) => {
        if (responseResult.errorCode == '0') {
            this.getrecurringUser();
            this.myToasterService.success(responseResult.Msg, 'Success');
        } else {
            this.myToasterService.error(responseResult.errorMsg, 'Try Again');
        }
            this.apiLoading = false;
      })
  }


  showAlert(msg){
    alertify.confirm(msg,
      () => {
        //okay 
        this.updaterecurringUser();
      },
      () => {
        //cancel
      }
      )
  }


  getPurchaseHistory(){
    this.apiService.apiPostData('user_payment_history', { userId : this.user.userId })
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.errorCode == '0') {
          this.purchaseDetails = { ...response.data };
          this.user.features = response.data.features;
          this.myCookieService.setCookie('user', this.user);
          this.profileService.updateProfile.emit();
          this.purchaseDetails.features = this.purchaseDetails.features.replace('[','').replace(']', '').split(',');
          console.log( typeof this.purchaseDetails)
        } else if(response.errorCode == '2') {
          this.errorMsg = response.errorMsg
        } else {
          //this.myToasterService.alert(response.errorCode, 'Error', response.errorMsg);
        }
      },
      (error: any) => {
        console.log(error);
      }
      )
  }

}
