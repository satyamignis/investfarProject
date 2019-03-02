import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {
  user:any;
  properties : any = [];
  preloadimg:any;
  apiLoading:any;
  totalCount = 0;
  pagination = [];
  pageNo = 1;
  limit = 10;
  deletePropertyId : any = 0;

  constructor(
    private myCookieService : MyCookieService,
    private apiService : ApiService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
   window.scrollTo(0, 0);
       this.preloadimg=true;
       setTimeout(() => {  
           this.preloadimg=false;
       }, 1000);

    this.user = this.myCookieService.getCookie('user');
    this.getMyProperties();
  }

  getMyProperties(){
      this.apiLoading=true;
      let proListOfVendorData = {
      userId : this.user.userId,
      serviceKey : this.user.serviceKey,
      limit : this.limit,
      page_no : this.pageNo
    };
    this.apiService.apiPostData('proListOfVendorForWeb', proListOfVendorData)
      .subscribe(
        (response : any) => {
          console.log(response);
          if(response.errorCode == '0'){
            this.properties = response.data;
            this.totalCount = response.total_count;
          } else {
            this.toastr.error(response.errorMsg, 'Error');
          }
          this.apiLoading=false;
        },
        (error : any) => {
          console.log(error);
          this.apiLoading=false;
        }
      )
  }

  pageChange(pageNo){
    window.scrollTo(0, 0);
    this.pageNo = pageNo;
    this.getMyProperties();
  }

  deletePropertyConfirm(propertyId, title){
    // this.deletePropertyId = propertyId;
    // console.log('------------propertyId', this.deletePropertyId);
    // //alertify.confirm(`Are you sure you want to delete '${title}' property`,
    //   () => {
    //     //okay
    //     this.deleteProperty();
    //   },
    //   () => {
    //     //cancel
    //   }
    // )
  }

  deleteProperty(){
    let deletePropertyData = {
      userId : this.user.userId,
      serviceKey : this.user.serviceKey,
      propertyId: this.deletePropertyId
    }
    this.apiService.apiPostData('deleteProperty', deletePropertyData)
      .subscribe(
        (response : any) => {
          console.log(response);
          if(response.errorCode == '0'){
            //this.toastr.alert(response.errorMsg, 'Success');
            this.getMyProperties();
          } else {
            this.toastr.error(response.errorMsg, 'Try Again');
          }
        },
        (error : any) => {
          console.log(error);
        }
      )
  }

  setDefaultPic(property){
    property.propertyImg = 'assets/images/ic_company_profile_image.png';
  }

}
