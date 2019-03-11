import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent implements OnInit {
  preloadimg:any;
  pricingList = [];
  selectedPlan: any;
  user : any;
  queryParams : any;
  params : any;
  apiLoading:any;

  constructor(
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private router : Router,
    private myToasterService : ToastrService,
    private activeRoute : ActivatedRoute
  ) { }

  ngOnInit() {

     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

    this.user = this.myCookieService.getCookie('user')
    this.getPlans();
    this.activeRoute.params.subscribe((params) => {
      this.params = params;
      console.log(params);
      this.activeRoute.queryParams.subscribe((queryParams) => {
        console.log(queryParams);
        this.queryParams = queryParams;
        if(this.queryParams.TransactionKey){
          if(this.queryParams.Status == 'Success'){
            // this.checkPurchasePlan();  
            this.addPurchasePlan();
          } else {
            this.myToasterService.error('Payment Failed !','Try Again');
            this.router.navigate(['/pricing']);
          }
        }
      });
    });
  }

  getPlans(){
    this.apiService.apiGetData('get_in_app_purchase')
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          this.pricingList = response.data;
          for(let i = 0; i < this.pricingList.length; i++){
            this.pricingList[i].desc = this.pricingList[i].sub_title.replace('[','').replace(']', '').split(',');
          }
        } else {
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getAccess(plan){
    this.selectedPlan = plan;
    if(this.user){
      this.payWithShield();
      // this.checkPurchasePlan();
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkPurchasePlan(){
    let getSubscriptionPlanData = {
      userId : this.user.userId
    }
    this.apiService.apiPostData('get_subscription_plans', getSubscriptionPlanData)
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          if(response.data.valuation_report_counts == '0' || response.data.valuation_report_counts == null){
            if(this.params.product_id){
              this.addPurchasePlan();  
            } else {
              this.payWithShield();    
            }
            // this.addPurchasePlan();
          } else {
            this.myToasterService.error('Your plan is already active no need to purchase again !', 'Try Again');
            if(this.params){
              this.router.navigate(['/pricing']);
            }
          }
        } else {
          this.myToasterService.error(response.errorMsg, 'Try Again');
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
    
  }

  payWithShield(){
    let winName = 'MyWindow';
    let winURL = this.apiService.getShieldPayUrl();
    // Amount=100&FromEmail=sender@mailinator.com&ToEmail=receiver@mailinator.com&ALLURL=http://www.shieldpay.com&RequestFrom=EcomNew.html&PaymentMethod=ALL&LANGUAGE=en_US&CurrencyCode=GBP
    let price = this.selectedPlan.price.replace('$','');
    let params = { 
      Amount : +price,
      FromEmail : this.user.email,
      ToEmail : this.user.super_admin_email,
      ALLURL : window.location.origin +'/pricing/' + this.selectedPlan.product_id,
      RequestFrom : 'EcomNew.html',
      PaymentMethod : 'ALL',
      LANGUAGE : 'en_US',
      CurrencyCode : 'USD'
    };       
    console.log(params)  
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', winURL);
    form.setAttribute('target','self');  
    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = params[i];
        form.appendChild(input);
      }
    }              
    document.body.appendChild(form);                       
    window.open('', winName);
    form.target = winName;
    form.submit();                 
    document.body.removeChild(form);  
  }

  addPurchasePlan(){
    let purchaseData = {
      userId : this.user.userId,
      product_id : this.params.product_id
    }
    this.apiService.apiPostData('set_subscription_plans', purchaseData)
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          this.myToasterService.success(response.errorMsg, 'Success');
          this.user.product_id = this.params.product_id;
          this.myCookieService.setCookie('user', this.user);
          this.router.navigate(['/my-purchase-history']);
        } else {
          this.myToasterService.error(response.errorMsg, 'Try Again');
          this.router.navigate(['/pricing']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  isNotPlanPurchased(product_id){
    let flag = true;
    return flag;
  }
}