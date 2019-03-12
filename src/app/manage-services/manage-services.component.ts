import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceDetailScreenComponent } from '../invoice-detail-screen/invoice-detail-screen.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MyModalService } from '../services/my-modal.service';
import { RatingComponent } from '../rating/rating.component';


@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {
  activeTab:any = '0';
  user : any;
  services :any = [];
  preloadimg:any;
  apiLoading:any;


  constructor(
    private modalService: NgbModal,
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private myModalService : MyModalService,
    private router : Router,
    private myToasterService : ToastrService
  ) { }


  getTimestring(value){ 
    if(value !='0000-00-00 00:00:00'){
     return new Date(value);
    }
  }

  ngOnInit() {
     this.user = this.myCookieService.getCookie('user');
     this.getServiceByType();

     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);
  }

  openDetails(s) {
    const modalRef = this.modalService.open(InvoiceDetailScreenComponent);
    modalRef.componentInstance.data = s;
    modalRef.componentInstance.type = 'company';
    modalRef.componentInstance.activeTab = this.activeTab;
    this.myModalService.bookingManagementAction.subscribe(
      (response : any) => {
        //console.log(response);
        this.manageBooking(response.id, response.status);
      }
    )
  }

  openRating(s){
    const modalRef = this.modalService.open(RatingComponent);
    modalRef.componentInstance.data = s;
    modalRef.componentInstance.type = 'companyToCustomer';
    this.myModalService.ratingCompanyToCustomerSuccess.subscribe(
      (response : any) => {
        this.getServiceByType();
      }
    )

  }

  changeActiveTab(value){
    this.activeTab = value
    this.getServiceByType();
  }

  getServiceByType(){
    this.apiLoading=true;
    this.apiService.apiPostData('getCompanyServicesListing',{
        serviceKey: this.user.serviceKey, 
        userId: this.user.userId,
        status: this.activeTab
      })
      .subscribe(
        (response: any) => {
          //console.log(response);
          if (response.errorCode == '0') {
            this.services = response.data;
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

  getColor(avgRating){
    let color = 'default';
    if(avgRating > 0) {
      color = 'ok';
    }
    return color;
  }

  manageBooking(id, status){
    this.apiLoading=true;
    this.apiService.apiPostData('bookingManagement',{
        serviceKey: this.user.serviceKey, 
        userId: this.user.userId,
        status: status,
        bookedId : id
      })
      .subscribe(
        (response: any) => {
          if (response.errorCode == '0') {
            this.myToasterService.success(response.errorMsg, 'Success');
            this.getServiceByType();
          } else if (response.errorCode == '7'){
            this.router.navigate(['/bank-detail']);
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

  setDefaultPic(service){
    service.image = './assets/images/resource/pro-tab-dummy.jpg';
  }

}

