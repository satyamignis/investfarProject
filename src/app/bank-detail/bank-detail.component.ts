import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyCookieService } from '../services/my-cookie-service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {

  bankDetailForm : FormGroup;
  user : any;
  is_only_bank = 0;
  preloadimg:any;
  apiLoading:any;

  constructor(
    private formBuilder : FormBuilder,
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private myToasterService : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
    this.user = this.myCookieService.getCookie('user');
    if(this.user.IBAN){
      this.is_only_bank = 1;
    }
    this.createForm();
  }

  createForm(){
    if(this.is_only_bank == 0){
      this.bankDetailForm = this.formBuilder.group({
        AccountHolderName : ['', Validators.required],
        BankAccountNumber : ['', Validators.required],
        IBAN : ['', Validators.required],
        Title : ['', Validators.required],
        FirstName : ['', Validators.required],
        LastName : ['', Validators.required],
        Gender : ['M', Validators.required],
        DateOfBirth : ['', Validators.required],
        FlatNumber : ['', Validators.required],
        BuildingNumber : ['', Validators.required],
        State : ['', Validators.required],
        Town : ['', Validators.required],
        Postcode : ['', Validators.required],
        Country : ['', Validators.required],
        Street : ['', Validators.required]
      });
    } else {
      this.bankDetailForm = this.formBuilder.group({
        AccountHolderName : ['', Validators.required],
        BankAccountNumber : ['', Validators.required],
        IBAN : ['', Validators.required],
      })
    }
  }

  get f() { return this.bankDetailForm.controls};
  
  onSubmit(){
    if(this.bankDetailForm.valid){
      this.apiLoading=true;
      let BankDetailData = this.bankDetailForm.value
      BankDetailData.userId = this.user.userId
      BankDetailData.CurrencyCode = 'USD'
      BankDetailData.BankCode = this.bankDetailForm.value.BankAccountNumber
      if(this.is_only_bank == 0){
        BankDetailData.DateOfBirth = this.getFormatedDate()
      }
      BankDetailData.CustomerKey = this.user.shieldpay_customer_key
      BankDetailData.RoutingNumber = ''
      BankDetailData.is_only_bank = this.is_only_bank;
      this.apiService.apiPostData('add_bank_detail', BankDetailData)
      .subscribe(
        (response : any) => {
          if(response.errorCode == '0'){
            this.myToasterService.success('Bank Detail & KYC Verification Successfully', 'Success');
            this.router.navigate(['/']);
            this.user.IBAN = response.data.IBAN;
            this.myCookieService.setCookie('user', this.user)
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

  getFormatedDate(){
    let finalDate = 
      ("00" + this.bankDetailForm.value.DateOfBirth.getDate()).slice(-2) + "/" +
      ("00" + (this.bankDetailForm.value.DateOfBirth.getMonth() + 1)).slice(-2) + "/" + 
      this.bankDetailForm.value.DateOfBirth.getFullYear();
      return finalDate;
  }

}

