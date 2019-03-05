import { Component, OnInit, ViewChild } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user : any = {};
  changePasswordForm : FormGroup;
  newPasswordSpan = false;
  confirmPasswordSpan = false;
  preloadimg:any;
  apiLoading:any;


  constructor(
    private myCookieService : MyCookieService,
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private myToasterService: ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
        this.preloadimg=true;
              setTimeout(() => {  
                 this.preloadimg=false;
    }, 1000);
    this.user = this.myCookieService.getCookie('user');
    this.createForm();
  }

  createForm(){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword : ['', Validators.required],
      newPassword : ['', Validators.required],
      confirmPassword : ['', Validators.required],
    })
  }

  get f() { return this.changePasswordForm.controls;}

  onSubmit(){
    console.log(this.changePasswordForm.value);
    if(this.changePasswordForm.valid && !this.confirmPasswordSpan && !this.newPasswordSpan){
      let editProfileData =  this.changePasswordForm.value;
      editProfileData.userId = this.user.userId;
      editProfileData.serviceKey = this.user.serviceKey
      editProfileData.email = this.user.email;
      this.apiLoading = true;
      this.apiService.apiPostData('changePassword', editProfileData)
      .subscribe(
        (response : any) => {
          console.log(response)
          if(response.errorCode == '0'){
            this.myToasterService.success(response.errorMsg, 'Success');
            this.router.navigate(['/']);
           } else {
             this.changePasswordForm.reset();
             this.myToasterService.error(response.errorMsg, 'Try Again');
           }
           this.apiLoading = false;

        },
        (error: any) => {
          console.log(error);
          this.apiLoading = false;
        }
      )
    }
  }

  onChange(){
    if(this.changePasswordForm.value.oldPassword != '' && this.changePasswordForm.value.newPassword != ''){
      if(this.changePasswordForm.value.oldPassword == this.changePasswordForm.value.newPassword){
        this.newPasswordSpan = true;
      } else {
        this.newPasswordSpan = false;
      }
    }
    if(this.changePasswordForm.value.confirmPassword != '' && this.changePasswordForm.value.newPassword != ''){
      if(this.changePasswordForm.value.confirmPassword == this.changePasswordForm.value.newPassword){
        this.confirmPasswordSpan = false;
      } else {
        this.confirmPasswordSpan = true;
      }
    }
  }
}

