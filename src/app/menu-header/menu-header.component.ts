import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MyCookieService } from '../services/my-cookie-service';
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
    private router : Router,private toastr: ToastrService
    ) { 
  }

  ngOnInit() {
    //alert(JSON.stringify(this.myCookieService.getCookie('user')));
    this.user = this.myCookieService.getCookie('user');
    this.headericonAdd();
  }

  onResize(event) {
    this.headericonAdd();
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
  setInterval(() => { 
    this.myCookieService.deleteCookieAll();
    this.apiLoading= false;
  }, 1000);
}

}
