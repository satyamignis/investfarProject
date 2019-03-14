import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  preloadimg:any;
  contactForm : FormGroup;
  apiLoading:any;
  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private myToasterService : ToastrService,
    private router : Router
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);

    this.createContactUsForm();
  }

  createContactUsForm(){
    this.contactForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  get f(){ return this.contactForm.controls;}

  onSubmit(){
    this.apiLoading=true;
    if(this.contactForm.valid){

      this.apiService.apiPostData('contact_us_frontend', this.contactForm.value)
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            this.myToasterService.success(response.errorMsg, 'Success');
            this.router.navigate(['/']);
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
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
