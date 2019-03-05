import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MyCookieService } from '../services/my-cookie-service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  setPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private myToasterService: ToastrService,
    private myCookieService: MyCookieService
    ) { }

  ngOnInit() {
  		window.scrollTo(0, 0);
        this.preloadimg=true;
        setTimeout(() => {  
           this.preloadimg=false;
        }, 1000);
    this.createForm();

  }

  createForm() {
    this.setPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      otp: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() { return this.setPasswordForm.controls; }

  onSubmit() {
    console.log(this.setPasswordForm.value);
    console.log(this.setPasswordForm.valid);
    if (this.setPasswordForm.valid) {
      this.apiLoading=true;
      let setPasswordData = this.setPasswordForm.value;
      this.apiService.apiPostData('verify_otp', setPasswordData)
        .subscribe(
          (response: any) => {
            console.log(response)
            if (response.errorCode == '0') {
              this.myToasterService.success(response.errorMsg,'Success');
              this.router.navigate(['/login']);
            } else {
              this.myToasterService.error(response.errorMsg,'Try Again');
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

}
