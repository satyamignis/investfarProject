import { Component, OnInit } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {
  preloadimg:any;
  user:any;
  valuationForm: FormGroup;
  link = '';
  apiLoading:any;

  constructor(  
    private myCookieService: MyCookieService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private myToasterService: ToastrService) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
     this.preloadimg=true;
     setInterval(() => {  
         this.preloadimg=false;
     }, 1000);

    this.user = this.myCookieService.getCookie('user');
    this.createForm();
  }
  createForm() {
    this.valuationForm = this.formBuilder.group({
      zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(5), Validators.minLength(5)])],
      address: ['', Validators.required]
    })
  }


  get f() { return this.valuationForm.controls; }

  onSubmit() {
    console.log(this.valuationForm.value);
    console.log(this.valuationForm.valid);
    if (this.valuationForm.valid) {
      if (this.user) {
        this.checkPurchasePlan()
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  onClear() {
    this.valuationForm.reset();
  }

  checkPurchasePlan() {
    let getSubscriptionPlanData = {
      userId: this.user.userId
    }

    this.apiLoading=true;
    this.apiService.apiPostData('get_subscription_plans', getSubscriptionPlanData)
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            if (response.data.valuation_report_counts == '0' || response.data.valuation_report_counts == null) {
              this.confirmBeforeRedirecting();
            } else {
              this.callHouseCanaryApi();
            }
          } else {
            this.myToasterService.error(response.message, 'Try Again');
          }
          this.apiLoading=false;

        },
        (error: any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
  }

  confirmBeforeRedirecting() {
    if(confirm('No plan is active. Do you want to purchase a new plan ?')) {
      this.onClear();
    }else{
      this.router.navigate(['/pricing']);
    }
  }

  callHouseCanaryApi() {
    this.apiService.getValuationDetails(this.valuationForm.value)
      .subscribe(
        (response: any) => {
          if(response['property/value_report_static_link'].api_code == 200){
            if (response['property/value_report_static_link'].result.link) {
              this.link = response['property/value_report_static_link'].result.link
              this.substractCount();
            } else {
              this.myToasterService.error('Invalid Address or Zipcode', 'Try Again')
            }
          } else {
            this.myToasterService.error('Invalid Address or Zipcode', 'Try Again')
          }
        }
      ),
      (error: any) => {
        console.log(error);
      }
  }

  substractCount() {
    this.apiService.apiPostData('subtract_report_counts', { userId: this.user.userId })
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            window.open(this.link, "_blank");
            this.onClear();
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
          }

        },
        (error: any) => {
          console.log(error);
        }
      )
  }


}
