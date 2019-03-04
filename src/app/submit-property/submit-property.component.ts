import { Component, OnInit, ViewChild } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Features } from '../services/features';
import * as Papa from 'papaparse';



declare const $: any;

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.css']
})
export class SubmitPropertyComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  preloadimg:any;
  propertyForm: FormGroup;
  apiLoading:any;
  //propertyTypes = PropertyTypes;
  //offerTypes = OfferTypes;
  features = Features;
  // cityOptions = Cities;
  options = {};
  dropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
    enableCheckAll: false
  };
  selectedFeatures: any = [];
  address: any = {}
  propertyImages: any = [];
  propertyPreviewImages: any = [];
  planImages: any = [];
  planPreviewImages: any = [];
  formType = '';
  propertyData: any;
  propertyId: any;
  user: any;
  defaultPropertyImageLength = 5;
  defaultPlanImageLength = 2;
  years : any = [];
  parkingChange = false;
  featureChange = false;
  homeChange = false;
  priceChange = false;

  constructor(
    private myCookieService: MyCookieService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private myToasterService: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  	window.scrollTo(0, 0);
  	 this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);


     // toggle for form open
    $('.Show').click(function() {
    $('#target').show(500);
    $('.Show').hide(0);
    $('.Hide').show(0);
    });
    $('.Hide').click(function() {
        $('#target').hide(500);
        $('.Show').show(0);
        $('.Hide').hide(0);
    });
    $('.toggle').click(function() {
        $('#target').toggle('slide');
    });


    if (this.myCookieService.checkCookie('user')) {
      this.user = this.myCookieService.getCookie('user')
      this.createPropertyForm();
      this.activeRoute.params
        .subscribe((params) => {
          this.propertyId = params.id;
          if (this.router.url.includes('submit')) {
            this.formType = 'submit';
          } else if (this.router.url.includes('edit')) {
            this.formType = 'edit';
            this.getPropertyDetails();
          }
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  createPropertyForm() {
    let date = new Date();
    let year = date.getFullYear();
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      searchType: ['', Validators.required],
      propertyCategory: ['', Validators.required],
      bathRooms: ['', Validators.required],
      bedRooms: ['', Validators.required],
      price: ['', Validators.required],
      live: ['', Validators.required],
      propertySize: ['', Validators.required],
      home: ['', Validators.required],
      selling: ['', Validators.required],
      hoafees: ['', Validators.required],
      // school: ['', Validators.required],
      // walkscore: ['', Validators.required],
      floor_plan: [false, Validators.required],
      parking: ['', Validators.required],
      year: ['', Validators.required],
      keyword: [''],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      addr: [''],
      features: ['']
    })
  }

  get f() { return this.propertyForm.controls; }

  onSubmit() {
    console.log('values', this.propertyForm.value);
    console.log('form valid', this.propertyForm.valid)
    console.log('selected feature', this.selectedFeatures)
    console.log('address', this.address)
    console.log('property image', this.propertyImages.length)
    console.log('plan image', this.planImages.length)
    this.isFormValid()
    if (this.isFormValid()) {
      this.apiLoading=true;
      let addPropertyData = new FormData();
      addPropertyData.append('serviceKey', this.user.serviceKey)
      addPropertyData.append('userId', this.user.userId)
      addPropertyData.append('feature', this.selectedFeatures)
      for (let key in this.propertyForm.value) {
        if (key != 'addr' && key != 'features') {
          addPropertyData.append(key, this.propertyForm.value[key])
        }
      }
      for (let key in this.address) {
        addPropertyData.append(key, this.address[key])
      }
      
      for(let i = 0; i < this.defaultPropertyImageLength; i++){
        let key = 'image' + (i+1);
        if(this.propertyImages[i]){
          addPropertyData.append(key, this.propertyImages[i]);
        } else {
          if(this.formType == 'edit'){
          addPropertyData.append(key, null);
          }
        }
      } 
      for(let i = 0; i < this.defaultPlanImageLength; i++){
        let key = 'planImage' + (i+1);
        if(this.planImages[i]){
          addPropertyData.append(key, this.planImages[i]);
        } else {
          if(this.formType == 'edit'){
            addPropertyData.append(key, null);
          }
        }
      } 
      console.log(addPropertyData)
      let methodName = '';
      if (this.formType == 'submit') {
        methodName = ('add_property');
      } else {
        methodName = ('updateProperty');
        addPropertyData.append('propertyId', this.propertyData.property_id);
        if(this.featureChange){
          addPropertyData.append('feature', '-1')
        }
      }
      this.apiService.apiPostData(methodName, addPropertyData)
        .subscribe(
          (response: any) => {
            console.log(response)
            if (response.errorCode == '0') {
              this.myToasterService.success(response.errorMsg, 'Success');
              this.router.navigate(['/my-properties']);
            } else {
              this.myToasterService.error(response.errorMsg, 'Error');
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

  handleAddressChange(address: any) {
    console.log('-------------address', address)
    this.address.address = address.formatted_address;
    this.address.latitude = address.geometry.location.lat()
    this.address.longitude = address.geometry.location.lng()
    for (let c of address.address_components) {
      if (JSON.stringify(c.types).includes('postal_code')) {
        console.log('zipcode :: ', c.long_name)
        this.propertyForm.patchValue({ zipcode: c.long_name })
      }
      // if (JSON.stringify(c.types).includes('locality') || JSON.stringify(c.types).includes('administrative_area_level_2')) {
      //   console.log('city ::', c.long_name)
      //   this.propertyForm.patchValue({ city: c.long_name })
      // }
    }
  }

  onFeatureSelect(event) {
    this.selectedFeatures.push(event.value)
  }

  onFeatureDeSelect(event) {
    this.selectedFeatures = this.selectedFeatures.filter((f) => { return f != event.value })
  }

  onPropertyFile(files) {
    for(let f of files){
      if(this.propertyImages.length < this.defaultPropertyImageLength && f.type.includes('image')) {
        this.propertyImages.push(f)
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.propertyPreviewImages.push(event.target.result);
        }
        reader.readAsDataURL(f);
      }
    }
  }

  onPlanFile(files) {
    for(let f of files){
      if(this.planImages.length < this.defaultPlanImageLength && f.type.includes('image')) {
        this.planImages.push(f)
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.planPreviewImages.push(event.target.result);
        }
        reader.readAsDataURL(f);
      }
    }
  }

  isFormValid() {
    let flag = false
    if (this.propertyPreviewImages.length >= 1 && this.propertyForm.valid && this.address.address) {
      if (this.propertyForm.value.floor_plan) {
        if (this.planPreviewImages.length >= 1) {
          flag = true
        }
      } else {
        flag = true
      }
    }
    return flag;
  }

  deletePropertyImage(index) {
    this.propertyImages.splice(index, 1);
    this.propertyPreviewImages.splice(index, 1);
  }

  deletePlanImage(index) {
    this.planImages.splice(index, 1);
    this.planPreviewImages.splice(index, 1);
  }

  getPropertyDetails() {
    let getPropertyDetailsData = {
      slug_name: this.propertyId,
    }
    if (this.user) {
      getPropertyDetailsData['user_id'] = this.user.userId
    }
    this.apiService.apiPostData('get_property_details', getPropertyDetailsData)
      .subscribe(
        (response: any) => {
          if (response.errorCode == '0') {
            console.log(response)
            this.propertyData = response.data;
            this.propertyForm.patchValue({ title: this.propertyData.title });
            this.propertyForm.patchValue({ addr: this.propertyData.address });
            this.address.address = this.propertyData.address;
            this.address.latitude = this.propertyData.latitude;
            this.address.longitude = this.propertyData.longitude;
            this.propertyForm.patchValue({ description: this.propertyData.description });
            this.propertyForm.patchValue({ propertyCategory: parseInt(this.propertyData.property_type) });
            this.propertyForm.patchValue({ searchType: this.propertyData.offer_type });
            this.propertyForm.patchValue({ city: this.propertyData.city });
            this.propertyForm.patchValue({ zipcode: this.propertyData.zipcode });
            this.propertyForm.patchValue({ bathRooms: this.propertyData.bath_rooms });
            this.propertyForm.patchValue({ bedRooms: this.propertyData.bed_rooms });
            this.propertyForm.patchValue({ parking: this.propertyData.parking });
            if(this.propertyData.parking == '-1') this.parkingChange = true;
            this.propertyForm.patchValue({ propertySize: this.propertyData.property_size });
            this.propertyForm.patchValue({ keyword: this.propertyData.keyword });
            this.propertyForm.patchValue({ year: this.propertyData.year });
            this.propertyForm.patchValue({ price: this.propertyData.price });
            if(this.propertyData.price == '-1') this.priceChange = true;
            this.propertyForm.patchValue({ hoafees: this.propertyData.hoafees });
            this.propertyForm.patchValue({ live: this.propertyData.live });
            this.propertyForm.patchValue({ home: this.propertyData.worth });
            if(this.propertyData.worth == '-1') this.homeChange = true;
            this.propertyForm.patchValue({ selling: this.propertyData.selling })
            if (this.propertyData.plan_images.length > 0) {
              this.propertyForm.patchValue({ floor_plan: true })
            }
            if(this.propertyData.worth == '-1') {
              this.featureChange = true;
            } else {

              this.selectedFeatures = JSON.parse(this.propertyData.features);
              let formControlFeatures = [];
              for (let f of this.features) {
                for (let s of this.selectedFeatures) {
                  if (parseInt(s) == f.value) {
                    formControlFeatures.push(f);
                  }
                }
              }
              this.propertyForm.patchValue({ features: formControlFeatures });
            }
            for (let img of this.propertyData.slide_image) {
              this.propertyPreviewImages.push(img);
              this.propertyImages.push(img);
            }
            for (let img of this.propertyData.plan_images) {
              console.log(img);
              this.planPreviewImages.push(img);
              this.planImages.push(img);
            }
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  uploadCSV(files){
    let file = files[0];
    let fileExt = file.name.substr(file.name.length - 4);
    let headerName = '';
    let isFieldNotEmpty = true;
    let isNotValidValue = true;
    if(fileExt.toLowerCase() == '.csv'){
      let validCSV = true;
      Papa.parse(file, {
        header: true,
        skipEmptyLines : true,
        beforeFirstChunk: (chunk) => {
          var rows = chunk.split( /\r\n|\r|\n/ );
          var headings = rows[0].split( ',' );
          headings[0] = 'title';
          headings[1] = 'description';
          headings[2] = 'feature';
          headings[3] = 'address';
          headings[4] = 'latitude';
          headings[5] = 'longitude';
          headings[6] = 'searchType';
          headings[7] = 'propertyCategory';
          headings[8] = 'bathRooms';
          headings[9] = 'bedRooms';
          headings[10] = 'price';
          headings[11] = 'live';
          headings[12] = 'propertySize';
          headings[13] = 'home';
          headings[14] = 'selling';
          headings[15] = 'hoafees';
          headings[16] = 'parking';
          headings[17] = 'year';
          headings[18] = 'keyword';
          headings[19] = 'zipcode';
          headings[20] = 'city';
          headings[21] = 'userId';
          rows[0] = headings.join();
          return rows.join( '\n' );
        },
        transform: (value, column) => {
          if(column == 'feature' || column == 'price' || column == 'home' || column == 'parking'){
            if(value.toLowerCase().replace(/ /g,'') == 'seevaluationreport'){
              value = '-1';
            }
          }
          if(column != 'userId' && column != 'keyword' && value == ''){
            isFieldNotEmpty = false;
            headerName = column
          }
          if(column == 'feature' || column == 'latitude' || column == 'longitude' || column == 'searchType' || column == 'propertyCategory' || column == 'bathRooms' || column == 'bedRooms' || column == 'price' || column == 'propertySize' || column == 'home'|| column == 'hoafees' || column == 'parking' || column == 'year' || column == 'zipcode' ){

            if(value.toLowerCase().replace(/ /g,'') == 'seevaluationreport'){
              value = '-1';
            } else {
              let newValue = +value;
              if(newValue.toString() == 'NaN'){
                isNotValidValue = false;
              }
            }
          }
          if(column == 'userId'){
            value = this.user.userId;
          }
          return value;
        },
        complete: (results, file) => {
          console.log(results)
          if(isFieldNotEmpty && isNotValidValue){
            this.uploadCsvApi(results);
          } else {
            this.myToasterService.error('Some fields in the CSV are empty or have invalid data please fill all appropriate values in the fields.' ,'Try Again');
          }
        }
      })
    } else {
      this.myToasterService.error('Please upload valid CSV file', 'Try Again');
    }
  }

  uploadCsvApi(results){
    console.log(JSON.stringify(results.data));
    $('#csvFile').val('');
    this.apiService.apiPostData('property_csv_upload', { data : results.data, userId : this.user.userId })
      .subscribe(
        (response: any) => {
          if (response.errorCode == '0') {
            this.myToasterService.success(response.errorMsg, 'Success');
            this.router.navigate(['/my-properties']);
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

}
