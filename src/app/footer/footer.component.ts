import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  newsLetterForm : FormGroup;

  constructor(
  	private formBuilder : FormBuilder,
    private apiService : ApiService,
    private myToasterService : ToastrService) { }

	  ngOnInit() {
	    this.createNewsLetterForm();
	  }

	  createNewsLetterForm(){
	    this.newsLetterForm = this.formBuilder.group({
	      email : ['', Validators.compose([Validators.required, Validators.email])]
	    });
	  }

	 
	scrollTOElement(){
	    const toElement = $('#topBody');
	    const focusElement = $('#topBody');
	    const offset = 0;
	    const speed = 800 * 1 || 500;
	    $('html, body').animate({
	      scrollTop: toElement.offset().top + offset
	    }, speed);
	    if (focusElement) {
	      $(focusElement).focus();
	    }
	}

	onSubmit(){
    console.log(this.newsLetterForm.value);
    console.log(this.newsLetterForm.valid);
    if(this.newsLetterForm.valid){
      this.apiService.apiPostData('newsletter', this.newsLetterForm.value)
      .subscribe(
        (response : any) => {
          if(response.errorCode == '0'){
            this.myToasterService.success(response.errorMsg, 'Success');
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
          }
          this.newsLetterForm.reset();
        },
        (error: any) => {
          this.myToasterService.error('Internal Server Error.', 'Sorry');
          console.log(error);
        }
      )
    }
    }
}
