import { Component, OnInit, ViewChild } from '@angular/core';
import { MyCookieService } from '../services/my-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiService } from '../services/api.service';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  preloadimg:any;
  countryCode:any;
  user : any = {};
  editProfileForm : FormGroup;
  address : any = {};
  profileImage ;
  profileImagePreview;
  
  constructor(
    private myCookieService : MyCookieService,
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private myToasterService: ToastrService,
    private profileService : ProfileService
  ) { }

  ngOnInit() {
     this.user = this.myCookieService.getCookie('user');
     this.preloadimg=true;
        setTimeout(() => {  
           this.preloadimg=false;
      }, 1000);


// this.editProfileForm.patchValue({ firstName: parseInt(this.user.firstName)});
// this.editProfileForm.patchValue({ lastName: this.user.lastName });
// this.editProfileForm.patchValue({ companyName: this.user.companyName });
// this.editProfileForm.patchValue({ email: this.user.email });
// this.editProfileForm.patchValue({ countryCode: this.user.countryCode });
// this.editProfileForm.patchValue({ number: this.user.number });
// this.editProfileForm.patchValue({ addr: this.user.addr });
// this.editProfileForm.patchValue({ bio: this.user.bio });


   
    console.log(this.placesRef);
    this.createForm();
  }


  createForm(){
    let tempPhone : any = this.user.phoneNo;
    tempPhone = tempPhone.split('-');
    console.log(tempPhone);
    this.address.address = this.user.address;
    this.address.longitude = this.user.longitude;
    this.address.latitude = this.user.latitude;
    if(this.user.registrationType == '1'){
      this.editProfileForm = this.formBuilder.group({
        firstName : [this.user.firstName, Validators.required],
        lastName : [this.user.lastName, Validators.required],
        email : [this.user.email, Validators.compose([Validators.required, Validators.email])],
        addr : [this.user.address, Validators.required],
        countryCode : [this.getCode(tempPhone[0]), Validators.required],
        number : [tempPhone[1], Validators.required],
        bio : [this.user.bio]
      })


    } else {
      this.editProfileForm = this.formBuilder.group({
        companyName : [this.user.companyName, Validators.required],
        email : [this.user.email, Validators.compose([Validators.required, Validators.email])],
        addr : [this.user.address, Validators.required],
        countryCode : [this.getCode(tempPhone[0]), Validators.required],
        number : [tempPhone[1], Validators.required],
        bio : [this.user.bio]
      })
    }
  }

  get f() { return this.editProfileForm.controls;}

  getDailingCode(value){
    let callingCode = ''
    for(let c of this.countryCode){
      if(c.code == value){
        callingCode = c.callingCode
      }
    }
    return callingCode;
  }

  getCode(value){
    let code = ''
    for(let c of this.countryCode){
      if(c.callingCode == value){
        code = c.code
      }
    }
    return code;
  }

  onSubmit(){
    console.log(this.editProfileForm.value);
    if(this.isFormValid){
      let editProfileData =  new FormData();
      for(let key in this.editProfileForm.value){
        editProfileData.append(key, this.editProfileForm.value[key]);
      }
      for(let key in this.address){
        editProfileData.append(key, this.address[key])
      }
      if(this.profileImage){
        editProfileData.append('profileImage', this.profileImage);
      }
      editProfileData.append('phoneNo', this.getDailingCode(this.editProfileForm.value.countryCode) + '-' + this.editProfileForm.value.number)
      editProfileData.append('deviceType', 'Web');
      editProfileData.append('serviceKey', this.user.serviceKey);
      editProfileData.append('userId', this.user.userId);
      editProfileData.append('registrationType', this.user.registrationType)
      this.apiService.apiPostData('updateProfile', editProfileData)
      .subscribe(
        (response : any) => {
          console.log(response)
          if(response.errorCode == '0'){
            this.myToasterService.success(response.errorMsg, 'Success');
            this.user.address = response.data[0].address;
            this.user.bio = response.data[0].bio;
            this.user.email = response.data[0].email;
            this.user.companyName = response.data[0].companyName;
            this.user.firstName = response.data[0].firstName;
            this.user.lastName = response.data[0].lastName;
            this.user.latitude = response.data[0].latitude;
            this.user.longitude = response.data[0].lastName;
            this.user.phoneNo = response.data[0].phoneNo;
            if(this.profileImage){
              this.user.profileImage = response.data[0].profileImage;
            }
            this.myCookieService.setCookie('user', this.user);
            this.profileService.updateProfile.emit();
            //this.activeModal.dismiss('Cross click');
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

  isFormValid(){
    let flag = false;
    if(this.editProfileForm.valid && this.address.address){
      flag = true;
    }
    return flag;
  }

  onProfileImage(files){
    if (files[0] && files[0].type.includes('image')) {
      this.profileImage = files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profileImagePreview = event.target.result;
      }
      reader.readAsDataURL(files[0]);
    }
  }

  handleAddressChange(address: any) {
    console.log('----------address', address);
    this.address.address = address.formatted_address;
    this.address.latitude = address.geometry.location.lat();
    this.address.longitude = address.geometry.location.lng();
  }
}
