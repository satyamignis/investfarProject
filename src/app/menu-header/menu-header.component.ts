import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MyCookieService } from '../services/my-cookie-service';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import alertify from 'alertify.js';

declare const $: any;

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  user:any;
  apiLoading:any;
  
  constructor(private myCookieService: MyCookieService,
    private router : Router,private toastr: ToastrService, private apiService : ApiService
    ) { 
  }

  ngOnInit() {
    //alert(JSON.stringify(this.myCookieService.getCookie('user')));
    this.user = this.myCookieService.getCookie('user');
    this.headericonAdd();

    /*cronJob for recurring Payment Check in db and make payment*/
    this.checkUserforRecurring();

  }

  onResize(event) {
    this.headericonAdd();
  }

  /*Check User For recurring Payment*/
  checkUserforRecurring(){
    var basePaymentUrl = this.apiService.squrePaymentgetURL();
    var holdvm =this;
    this.apiService.selectCardRecurring('get_reccurring_data')
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0' && (response.data).length > 0){

          var payerid;
          var payercustomer_id;
          var payercustomer_card_id;
          var payreamount;
          var payreplan_title

          for(var i = 0; i< (response.data).length; i++)
          {
            //**** recurring Payment******
            payerid = ((response.data)[i].id);
            payercustomer_id = ((response.data)[i].customer_id);
            payercustomer_card_id = ((response.data)[i].customer_card_id);
            payreamount = ((response.data)[i].amount);
            payreplan_title = ((response.data)[i].plan_title)+' Recurring Payment';

            $.ajax({
              type: 'POST',
              url: basePaymentUrl+'chargeCard.php',
              data: {'customerId':payercustomer_id, 'customerCardId':payercustomer_card_id,'amount':payreamount, 'planTitle':payreplan_title, 'recurringCid':payerid},
              success: function (result) {
                if(result != 'Payment failed'){
                  holdvm.apiService.addCardRecurring('update_reccurring_date',{'id':result})
                  .subscribe(
                    (isresponse : any) => {
                      console.log(isresponse);
                    })
                }
              }
            })
          }
        } 
      })
  }

  checkAccessibility(path){
    if(this.user && this.user.product_id == ''){
      this.showAlert('You have not purchase any plan. <br/> Would you like purchase one ?', '/pricing');
    } else if(this.user && this.user.product_id != '' ){
      if((path.includes('real-estate-legal-forms'))
        || (path.includes('property-search'))
        || (path.includes('map-search'))
        || (path.includes('open-home-search'))
        || (path.includes('featured-properties'))
        || (path.includes('organization-login'))
        ){
        this.router.navigate([path]);
    } else {
      this.showAlert('Your plan do not have access of this feature. <br/> Would you like purchase upgraded plan ?', '/pricing');
    }
  } else {
    this.showAlert('You do not have access to this feature. <br/> Please Login', '/login');
  }
}


showAlert(msg, path){
  alertify.confirm(msg,
    () => {
      //okay
      this.router.navigate([path]);
    },
    () => {
      //cancel
    }
    )
}

headericonAdd(){
  if(window.innerWidth < 768){
    $('.header-lower.top-nav li.dropdown').append('<div class="dropdown-btn"><Span class="fa fa-angle-down"></span></div>');
    $('.header-lower.top-nav li.dropdown .dropdown-btn').on('click', function() {
      $(this).prev('ul').slideToggle(500);
    });

    $('.loginSuccessMenu').on('click',function(){
      $(this).find('ul.loginOpen').toggle();
    })
  }
}

logout(){
  this.apiLoading= true;
  this.myCookieService.deleteCookie('user');
  this.user = undefined;
  this.toastr.success('Successfully Logout.','Success');
  setTimeout(() => { 
    this.myCookieService.deleteCookieAll();
    this.apiLoading= false;
  }, 1000);
}
}
