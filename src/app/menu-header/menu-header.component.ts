import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';


declare const $: any;

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
  user:any;
  apiLoading:any;
  
  constructor(private myCookieService: MyCookieService,private router : Router,private toastr: ToastrService
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
      this.apiLoading= false;
     }, 500);
  }

}
