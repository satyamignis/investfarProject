import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { MyModalService } from '../services/my-modal.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  user : any;
  @Input() data;
  @Input() type;
  rating = 0;
  comment = '';

  constructor(
    public activeModal: NgbActiveModal,
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private myToasterService : ToastrService,
    private myModalService : MyModalService
  ) { }

  ngOnInit() {
    this.user = this.myCookieService.getCookie('user');
    console.log(this.data);
    console.log(this.type);
  }

  onStartClick(event){
    this.rating = event.rating;
  }

  onSubmit(){
    console.log(this.rating);
    console.log(this.comment);
    if(this.type == 'companyToCustomer'){
      this.ratingToCustomer();
    } else if ( this.type == 'customerToCompany'){
      this.ratingToCompany();
    }
  }

  ratingToCustomer(){
    this.apiService.apiPostData('addRatingToCustomer',{
      serviceKey: this.user.serviceKey, 
      userId: this.user.userId,
      companyId : this.data.companyId,
      rating : this.rating,
      review : this.comment,
      vendorId : this.data.serviceId,
      bookedId : this.data.bookedId
    })
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.errorCode == '0') {
          this.activeModal.dismiss();
          this.myToasterService.success(response.errorMsg, 'Success');
          this.myModalService.ratingCompanyToCustomerSuccess.emit('done');
        } else {
          this.myToasterService.error(response.errorMsg, 'Try Again');
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  ratingToCompany(){
    this.apiService.apiPostData('addRatingReview',{
      serviceKey: this.user.serviceKey, 
      userId: this.user.userId,
      rating : this.rating,
      review : this.comment,
      vendorId : this.data.serviceId,
      vendorType : 2,
      bookedId : this.data.bookedId
    })
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.errorCode == '0') {
          this.activeModal.dismiss();
          this.myToasterService.success(response.errorMsg, 'Success');
          this.myModalService.ratingCustomerToCompanySuccess.emit('done');
        } else {
          this.myToasterService.error(response.errorMsg, 'Try Again');
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  } 

  setDefaultPic(){
    this.data.image = 'assets/images/ic_company_profile_image.png';
  }
}
