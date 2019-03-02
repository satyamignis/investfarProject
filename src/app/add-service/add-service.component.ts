import { Component, OnInit, ViewChild } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  addServiceForm: FormGroup;
  preloadimg:any;
  address: any = {};
  apiLoading:any;
  user:any;
  categories:any;
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'subCatName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
    enableCheckAll: false
  };
  subCategories = [];
  editServiceId : any = '';
  constructor(
    private myCookieService: MyCookieService,
    private apiService: ApiService, 
    private formBuilder: FormBuilder,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.user = this.myCookieService.getCookie('user');
    this.getCategory();
  	window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

    this.createAddServiceForm();
    //  this.activeRoute.params.subscribe((params) => {
    //   this.editServiceId = params.id;
    //   if(this.router.url.includes('edit')){
    //     this.type = 'edit';
    //     this.getSeriveDetails();
    //   } else {
    //     this.type = 'add' ;
    //   }
    // })
     
  }

  createAddServiceForm() {
    this.addServiceForm = this.formBuilder.group({
      catId: ['', Validators.required],
      subCat: ['', Validators.required],
      name: ['', Validators.required],
      minPrice: [0],
      maxPrice: ['', Validators.required],
      rate_type: ['0', Validators.required],
      addr: ['', Validators.required]
    })
  }

  get f() { return this.addServiceForm.controls; }

  handleAddressChange(address: any) {
    this.address.address = address.formatted_address;
    this.address.latitude = address.geometry.location.lat();
    this.address.longitude = address.geometry.location.lng();
  }

  getCategory() {
    this.apiService.apiPostData('getCategory', { serviceKey: this.user.serviceKey })
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.errorCode == '0') {
            this.categories = response.data;
          } else {
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  getSubCategories($event) {
    this.apiService.apiPostData('getSubCategory',
      { serviceKey: this.user.serviceKey, categoryId: this.addServiceForm.value.catId })
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.errorCode == '0') {
            this.subCategories = response.data;
          } else {

          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }


   onSubmit() {
    if (this.isFormValid()) {
      this.apiLoading=true;
      let addServiceData = {
        serviceKey : this.user.serviceKey,
        userId : this.user.userId
      }
      for(let key in this.address){
        addServiceData[key] = this.address[key];
      }
      for(let key in this.addServiceForm.value){
        if(key != 'subCat' && key != 'addr'){
          addServiceData[key] = this.addServiceForm.value[key];
        }
      }
      addServiceData['subCatId'] = '';
      for(let s of this.addServiceForm.value.subCat){
        addServiceData['subCatId'] += s.id + ',';
      }
      // let methodName = '';
      // if(this.type == 'add'){
      //   methodName = ('');
      // } else if (this.type == 'edit'){
      //   methodName = ('');
      //   addServiceData['serviceId'] = this.editServiceId;
      // }
      addServiceData['subCatId'] = addServiceData['subCatId'].substring(0, addServiceData['subCatId'].length - 1);
      this.apiService.apiPostData('addCompanyService', addServiceData)
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.errorCode == '0') {
              this.toastr.success(response.errorMsg, 'Success');
              this.router.navigate(['/my-offered-services'])
            } else {
              this.toastr.error(response.errorMsg, 'Try Again');
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

  isFormValid() {
    let flag = false;
    if (this.addServiceForm.valid && this.address.address) {
      flag = true;
    }
    return flag;
  }

}
