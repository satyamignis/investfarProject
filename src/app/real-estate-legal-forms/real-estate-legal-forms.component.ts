import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-real-estate-legal-forms',
  templateUrl: './real-estate-legal-forms.component.html',
  styleUrls: ['./real-estate-legal-forms.component.css']
})
export class RealEstateLegalFormsComponent implements OnInit {
  preloadimg:any;
  arrgementForms : any = [];
  loanForms : any = [];
  file_path : any = '';
  constructor(private apiService : ApiService) { }

  ngOnInit() {
  	 window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
     this.getRealEstate();
  }

getRealEstate(){
    this.file_path = this.apiService.getFileURL();
    this.apiService.apiGetData('get_re_legal_forms')
    .subscribe(
      (response : any) => {
        if(response.errorCode == '0'){
          console.log(response)
          this.arrgementForms = response.data.purchaseForms
          this.loanForms = response.data.subjectToExistingLoanForms
        } else {
          console.log('error')
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}