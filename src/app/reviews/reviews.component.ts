import { Component, OnInit } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  user : any = {};
  ratings : any = [];
  preloadimg:any;
  apiLoading:any;

  constructor(
    private myCookieService : MyCookieService,
    private apiService: ApiService,
    private myToasterService: ToastrService
  ) { }

  ngOnInit() {
  	
	window.scrollTo(0, 0);
	this.preloadimg=true;
	setTimeout(() => {  
		this.preloadimg=false;
	}, 1000);

    this.user = this.myCookieService.getCookie('user');
    console.log(this.user);
    this.getRatings();
  }

  getRatings(){
    let getRatingsData : any = {
      companyId : this.user.userId
    }
    if(this.user.registrationType == 2){
      getRatingsData.for_company = 1;
    }
    this.apiService.apiPostData('getReviews', getRatingsData)
    .subscribe(
      (response : any) => {
        console.log(response)
        if(response.errorCode == '0'){
          this.ratings = response.data;
         } else {
          this.myToasterService.error(response.errorMsg, 'Try Again');
         }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getColor(avgRating){
    let color = 'default';
    if(avgRating > 0) {
      color = 'ok';
    }
    return color;
  }
}

