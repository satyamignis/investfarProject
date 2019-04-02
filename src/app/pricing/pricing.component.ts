import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare const $: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class PricingComponent implements OnInit {
  preloadimg:any;
  selectedPlan: any;
  user : any;
  queryParams : any;
  params : any;
  apiLoading:any;

  pricingList:any=[{
      product_id:"com.investfar.1report_tool",
      title:"À la carte Services",
      sub_title:"[Per Valuation / Analytic reports,Investor Consultants,InvestFar App,Free listing]",
      app_title:"1 Valuation Report",
      price:"$7.99",
      color_code:"#BFDCA4",
      desc:[
         "$8.99 Per Valuation Report",
         "$45.99 Mobile Notarization",
         "$24.99 20 additional photos",
         "$24.99 1-Minute Property Video",
         "$84.99 Residential Property Inspection (Exterior Only)",
         "$99.99 Residential Property Inspection (Exterior & Interior)",
         "$184.99 Document pick-up & Delivery (Notary & title closing)"
      ]
   },
   {
      product_id:"com.investfar.5report_tool",
      title:"Novice",
      sub_title:"[5 Valuation / Analytic reports,Investor Consultants,Directory Access,InvestFar App,Free listing,Blog]",
      app_title:"5 Valuation Reports",
      price:"$24.99",
      color_code:"#0463B5",
      desc:[
         "5 Valuation / Analytic reports",
         "Investor Consultants",
         "Directory Access",
         "InvestFar App",
         "Free listing",
         "Blog",
         "$7.99 Per Valuation Report",
         "$41.99 Mobile Notarization",
         "$19.99 20 additional photos",
         "$19.99 1-Minute Property Video",
         "$74.99 Residential Property Inspection (Exterior Only)",
         "$94.99 Residential Property Inspection (Exterior & Interior)",
         "$84.99 Documents pick-up & Delivery (Notary docs, notices etc)"
      ]
   },
   {
      product_id:"com.investfar.15report_tool",
      title:"Apprentice",
      sub_title:"[15 Valuation / Analytic reports,Investor Consultants,Directory Access,InvestFar App,Free listing,Blog,Newsletter,Monthly Market report alerts,FREE or discounted real estate seminars and events]",
      app_title:"15 Valuation Reports",
      price:"$54.99",
      color_code:"#7151D0",
      desc:[
         "15 Valuation / Analytic reports",
         "Investor Consultants",
         "Directory Access",
         "InvestFar App",
         "Free listing",
         "Blog",
         "Newsletter",
         "Monthly Market report alerts",
         "FREE or discounted real estate seminars and events",
          "$7.99 Per Valuation Report",
          "$41.99 Mobile Notarization",
          "$19.99 20 additional photos",
          "$19.99 1-Minute Property Video",
          "$74.99 Residential Property Inspection (Exterior Only)",
          "$94.99 Residential Property Inspection (Exterior & Interior)",
          "$84.99 Documents pick-up & Delivery (Notary docs, notices etc)"
      ]
   },
   {
      product_id:"com.investfar.25report_tool",
      title:"Investors Club",
      sub_title:"[25 Valuation / Analytic reports,Real Estate legal forms,Investor Consultants,Directory Access,Exclusive Forum,InvestFar App,Market data,Free listing,Blog,Newsletter,Monthly market report alerts,Investment criteria property match alerts,Private money introductions or joint ventures,FREE or discounted real estate seminars and events]",
      app_title:"25 Valuation Reports",
      price:"$149.99",
      color_code:"#DA7EB1",
      desc:[
         "25 Valuation / Analytic reports",
         "Real Estate legal forms",
         "Investor Consultants",
         "Directory Access",
         "Exclusive Forum",
         "InvestFar App",
         "Market data",
         "Free listing",
         "Blog",
         "Newsletter",
         "Monthly market report alerts",
         "3-Year workmanship warranty",
         "Investment criteria property match alerts",
         "Private money introductions or joint ventures",
         "FREE or discounted real estate seminars and events",
         "Contractor project matching&project completion monitoring",
          "$7.99 Per Valuation Report",
          "$41.99 Mobile Notarization",
          "$19.99 20 additional photos",
          "$19.99 1-Minute Property Video",
          "$74.99 Residential Property Inspection (Exterior Only)",
          "$94.99 Residential Property Inspection (Exterior & Interior)",
          "$84.99 Documents pick-up & Delivery (Notary docs, notices etc)"
      ]
   }
];

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

    this.user = this.myCookieService.getCookie('user');

    // if need call api so use this
    //this.getPlans();

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

    this.accordionBox();
  }

  //Accordion Box
    accordionBox(){
    $(".accordion-box").on('click', '.acc-btn', function() {
      var target = $(this).parents('.accordion');
      if($(this).hasClass('active')!==true){
        $('.accordion .acc-btn').removeClass('active');
      }
      if ($(this).next('.acc-content').is(':visible')){
        return true;
      }else{
        $(this).addClass('active');
        $('.accordion').removeClass('active-block');
        $('.accordion .acc-content').slideUp(300);
        target.addClass('active-block');
        $(this).next('.acc-content').slideDown(300);  
      }
    });  

    $(".accordion-box").on('click', '.acc-btn.active', function() {
        $('.accordion .acc-btn').removeClass('active');
        $('.accordion .acc-content').slideUp(300);
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

      /*squre Pay*/
      localStorage.setItem('planTitle',plan.title);
      localStorage.setItem('planPrice',plan.price);
      localStorage.setItem('product_id',plan.product_id);
      this.router.navigate(['/payment']);
      /*********************/
      //this.payWithShield();
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