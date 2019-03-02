import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  email:any;
  constructor(
  	    	private api:ApiService,
  	    	private toastr: ToastrService

  	    ) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
  }

  forgotPassword(){
  	    this.apiLoading=true;
        this.api.apiPostData('otp_send',{'email':this.email})
        .subscribe(
        (response : any) => {
        if(response.errorCode == '0'){
          this.toastr.success('', response.errorMsg);
          //this.router.navigate(['/set-password']);
        } else {
          this.toastr.error('', response.errorMsg);
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
