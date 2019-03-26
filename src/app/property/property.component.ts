import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PropertyTypes } from '../services/property-types';
import { OfferTypes } from '../services/offer-types';
import { MyCookieService } from '../services/my-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PropertyAndOfferService } from '../services/property-and-offer.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Features } from '../services/features';
import alertify from 'alertify.js';
declare const $: any;
declare let google: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  preloadimg:any;
  @ViewChild('slideshow') slideshow : any;
  closeResult: string;
  radius = 500;
  propertyId: any;
  propertyData: any;
  imageUrlArray: any = [];
  planImages: any = [];
  user: any;
  contactForm: FormGroup;
  features = Features;
  modelRef: NgbModalRef;
  googleResponses = [];
  googleSearchType = '';
  map;
  pyrmont = { lat: -33.867, lng: 151.195 };
  panorama : any;
  link = '';
  apiLoading:any;

  isOfferTypes:any  = [
    { text : 'Buy' },
    { text : 'Rent' },
    { text : 'Sell' },
    { text : 'Sold' },
  ];


  property:any = [
    { text : 'Condo' },
    { text : 'Plot' },
    { text : 'Single Family' },
    { text : 'Multi Family' },
    { text : 'Apartment' },
    { text : 'Duplex' },
    { text : 'Office' },
    { text : 'Townhouse' },
  ]

  propertyListArr:any = [
    { 'value' : 1, 'text' : 'Condo' },
    { 'value' : 2, 'text' : 'Plot' },
    { 'value' : 3, 'text' : 'Single Family' },
    { 'value' : 4, 'text' : 'Multi Family' },
    { 'value' : 5, 'text' : 'Apartment' },
    { 'value' : 6, 'text' : 'Duplex' },
    { 'value' : 7, 'text' : 'Office' },
    { 'value' : 8, 'text' : 'Townhouse' },
]


offerListArr:any = [
    { 'value' : 1, 'text' : 'Buy' },
    { 'value' : 2, 'text' : 'Rent' },
    { 'value' : 3, 'text' : 'Sell' },
    { 'value' : 4, 'text' : 'Sold' },
]

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private myCookieService: MyCookieService,
    private myToasterService: ToastrService,
    private formBuilder: FormBuilder,
    private propertyAndOfferService: PropertyAndOfferService,
    private modalService: NgbModal) {

    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);

    this.activeRoute.params
    .subscribe((params) => {
      this.propertyId = params.title
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    let userAgent = navigator.userAgent;
    if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i )|| userAgent.match( /Intel Mac /i )) {
      window.location.href = 'com.investfar://oauth-response?property=' + this.propertyId;
      setTimeout(() => {
        this.reInit();
      }, 2000)
    } else if (userAgent.match( /Android/i )){
      window.location.href = 'com.investfar://oauth-response?property=' + this.propertyId;
      setTimeout(() => {
        this.reInit();
      }, 2000)
    } else {
      this.reInit()
    }
    // this.streetView();
  }
  
  open(content, type) {
    this.getGooglePlaceAPIData(type);
    this.modelRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modelRef.result.then((result) => {
    }, (reason) => {
    });
  }

  changerImage(param){
    this.slideshow.goToSlide(param);
  }


  reInit(){
    this.user = this.myCookieService.getCookie('user');
    this.getPropertyDetails();
    this.createContactForm();
  }

  getGooglePlaceAPIData(type) {
    this.googleResponses = [];
    this.googleSearchType = type;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.pyrmont,
      zoom: 15
    });
    let service = new google.maps.places.PlacesService(this.map);
    let serviceData: any = {
      location: this.pyrmont,
      radius: this.radius,
    }
    if (this.googleSearchType == 'school') {
      serviceData.type = ['school']
    }
    service.nearbySearch(serviceData, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.googleResponses = results;
        setTimeout(() => {
        }, 500);
        console.log(this.googleResponses);
      }
    })
  }

  streetView(){
    this.panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'),
            {
              position: {lat: 37.869260, lng: -122.254811},
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
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
            this.propertyData = response.data;
            for (let i = 0; i < this.propertyListArr.length; i++) {
                if(this.propertyListArr[i].value == this.propertyData.property_type){
                  this.propertyData['property_name']=this.propertyListArr[i].text;
                }
              }
              for (let i = 0; i < this.offerListArr.length; i++) {
                if(this.offerListArr[i].value == this.propertyData.offer_type){
                  this.propertyData['offer_name']=this.offerListArr[i].text;
                }
              }
            if (response.data.slide_image.length > 0) {
              this.imageUrlArray = response.data.slide_image
              for (let i = 0; i < this.imageUrlArray.length; i++) {
                this.imageUrlArray[i] = this.imageUrlArray[i];
              }
            }
            if (response.data.plan_images.length > 0) {
              this.planImages = response.data.plan_images
              for (let i = 0; i < this.planImages.length; i++) {
                this.planImages[i] = this.planImages[i];
              }
            }

            this.features = this.features.filter((f) => {
              return this.propertyData.features.includes(f.value.toString());
            })
            console.log(this.features);
            this.pyrmont.lat = +this.propertyData.latitude;
            this.pyrmont.lng = +this.propertyData.longitude;
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  addToFavorites(favourite) {
    if (this.user) {
      this.addToFavoriteApiCall(favourite)
    } else {
      this.router.navigate(['/login']);
    }
  }

  addToFavoriteApiCall(favourite) {
    let favouriteData = {
      serviceKey: this.user.serviceKey,
      userId: this.user.userId,
      vendorId: this.propertyData.property_id,
      favourite: favourite,
      vendorType: 1
    }
    console.log(favouriteData)
    this.apiService.apiPostData('getFavourite', favouriteData)
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            this.myToasterService.success(response.errorMsg, 'Success');
            this.getPropertyDetails();
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again');
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  get f() { return this.contactForm.controls; }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.user) {
        console.log(this.contactForm.value);
        let contactFormData = this.contactForm.value
        contactFormData.user_id = this.user.userId;
        contactFormData.property_id = this.propertyData.property_id
        this.apiService.apiPostData('contact_to_property_owner', contactFormData)
          .subscribe(
            (response: any) => {
              if (response.errorCode == '0') {
                this.myToasterService.success(response.errorMsg, 'Success')
                this.contactForm.reset();
              } else {
                this.myToasterService.error(response.errMsg, 'Try Again')
              }
            },
            (error: any) => {
              console.log(error);
            }
          )
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.myToasterService.error( 'Invalid Form!','Try Again')
    }
  }

  navigate(type, value) {
    console.log(type, value)
    if (type == 'offer-type') {
      value = this.propertyAndOfferService.getOfferTypeKeyValue(value, 'key');
    } else if (type == 'property-type') {
      value = this.propertyAndOfferService.getPropertyKeyTypeValue(value, 'key');
    }
    this.router.navigate([`/properties/${type}/${value}`]);
  }

  getColor(avgRating) {
    let color = 'default';
    if (avgRating > 0) {
      color = 'ok';
    }
    return color;
  }


  //valuation

  onValuation() {
    if (this.user) {
      this.checkPurchasePlan();
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkPurchasePlan() {
    let getSubscriptionPlanData = {
      userId: this.user.userId
    }
    this.apiLoading=true;
    this.apiService.apiPostData('get_subscription_plans', getSubscriptionPlanData)
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            if (response.data.valuation_report_counts == '0' || response.data.valuation_report_counts == null) {
              this.confirmBeforeRedirecting();
            } else {
              this.callHouseCanaryApi();
            }
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again')
          }
          this.apiLoading=false;
        },
        (error: any) => {
          console.log(error);
        }
      )
  }

  confirmBeforeRedirecting() {
    alertify.confirm('No plan is active. Do you want to purchase a new plan ?',
      () => {
        //okay
        this.router.navigate(['/pricing']);
      },
      () => {
        //cancel
      }
    )
  }

  callHouseCanaryApi() {
    this.apiService.getValuationDetails({ zipcode : this.propertyData.zipcode, address : this.propertyData.address})
      .subscribe(
        (response: any) => {
          if(response['property/value_report_static_link'].api_code == 200){
            if (response['property/value_report_static_link'].result.link) {
              this.link = response['property/value_report_static_link'].result.link
              this.substractCount();
            } else {
              this.myToasterService.error('Invalid Address or Zipcode', 'Try Again');
            }
          } else {
            this.myToasterService.error('Invalid Address or Zipcode', 'Try Again');
          }
        }
      ),
      (error: any) => {
        console.log(error);
      }
  }

  substractCount() {
    this.apiService.apiPostData('subtract_report_counts', { userId: this.user.userId })
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.errorCode == '0') {
            window.open(this.link, "_blank");
          } else {
            this.myToasterService.error(response.errorMsg, 'Try Again')
          }
        },
        (error: any) => {
          console.log(error);
        }
      )
  }


}
