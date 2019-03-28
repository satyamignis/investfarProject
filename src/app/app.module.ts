import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppComponents, AppRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SlideshowModule } from 'ng-simple-slideshow';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { NgxCurrencyModule } from 'ngx-currency';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ngx-currency/src/currency-mask.config';
import { StarRatingModule } from 'angular-star-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

/* %%%%%%%%%%%%%% Service %%%%%%%%%%%%%%%%%%*/
import { ApiService } from './services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { MyCookieService } from './services/my-cookie-service';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { MyModalService } from './services/my-modal.service';
import { ImagePipe } from './services/image.pipe';
import { PhonePipe } from './services/phone.pipe';
import { PropertyAndOfferService } from './services/property-and-offer.service';
import {TimeAgoPipe} from 'time-ago-pipe';

/* //////////////////////////////////////// */
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './login/login.component';
import { LocalInvestorConsultantComponent } from './local-investor-consultant/local-investor-consultant.component';
import { HomeImprovementNetworkComponent } from './home-improvement-network/home-improvement-network.component';
import { SeminarsEventsNvestorsClubComponent } from './seminars-events-nvestors-club/seminars-events-nvestors-club.component';
import { ValuationComponent } from './valuation/valuation.component';
import { RealEstateLegalFormsComponent } from './real-estate-legal-forms/real-estate-legal-forms.component';
import { PrivacyPolicyTermsComponent } from './privacy-policy-terms/privacy-policy-terms.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CareersComponent } from './careers/careers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContractorRegistrationComponent } from './contractor-registration/contractor-registration.component';
import { CompaniesRegistrationComponent } from './companies-registration/companies-registration.component';
import { RealEstateAgentRegistrationComponent } from './real-estate-agent-registration/real-estate-agent-registration.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { MyPurchaseHistoryComponent } from './my-purchase-history/my-purchase-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { MyOfferedServicesComponent } from './my-offered-services/my-offered-services.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { OfferTypeRentComponent } from './offer-type-rent/offer-type-rent.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { ToastrModule } from 'ngx-toastr';
import { OfferTypeSellComponent } from './offer-type-sell/offer-type-sell.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { InvestfarComponent } from './investfar/investfar.component';
import { InvoiceDetailScreenComponent } from './invoice-detail-screen/invoice-detail-screen.component';
import { RatingComponent } from './rating/rating.component';
import { PropertyComponent } from './property/property.component';
import { SellComponent } from './sell/sell.component';
import { RentComponent } from './rent/rent.component';
import { ComparePropertyComponent } from './compare-property/compare-property.component';
import { FilterPropertyComponent } from './filter-property/filter-property.component';
import { MlsPropertyComponent } from './mls-property/mls-property.component';
import { MapComponent } from './map/map.component';
import { UserPropertyComponent } from './user-property/user-property.component';
import { ReviewsComponent } from './reviews/reviews.component';

export const CustomCurrencyMaskConfig: any = {
  align: "left",
  allowNegative: false,
  allowZero: false,
  decimal: ".",
  precision: 2,
  prefix: "$",
  suffix: "",
  thousands: ","
};

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('900032613539569')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('815pz8jv8lrbje', true, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PricingComponent,
    ContractorsComponent,
    CompaniesComponent,
    LoginComponent,
    LocalInvestorConsultantComponent,
    HomeImprovementNetworkComponent,
    SeminarsEventsNvestorsClubComponent,
    ValuationComponent,
    RealEstateLegalFormsComponent,
    PrivacyPolicyTermsComponent,
    AboutusComponent,
    CareersComponent,
    ContactUsComponent,
    ContractorRegistrationComponent,
    CompaniesRegistrationComponent,
    RealEstateAgentRegistrationComponent,
    MyPropertiesComponent,
    MyFavoritesComponent,
    MyPurchaseHistoryComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    AddServiceComponent,
    MyOfferedServicesComponent,
    ManageServicesComponent, 
    OfferTypeRentComponent,
    BankDetailComponent,
    SubmitPropertyComponent,
    MenuHeaderComponent,
    OfferTypeSellComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    InvestfarComponent,
    InvoiceDetailScreenComponent,
    RatingComponent,
    PropertyComponent,
    ImagePipe,
    PhonePipe,
    TimeAgoPipe,
    SellComponent,
    RentComponent,
    ComparePropertyComponent,
    FilterPropertyComponent,
    MlsPropertyComponent,
    MapComponent,
    UserPropertyComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SlideshowModule,
    GooglePlaceModule,
    NgbModule.forRoot(),
    NgxCurrencyModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    StarRatingModule.forRoot(),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrCZsgteqhXOaC6l8qFnki2H3GMNRAW0U'
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    
  ],
  providers: [
    ApiService,
    CookieService,
    MyCookieService, 
    MyModalService,
    PropertyAndOfferService,
    AuthGaurdService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: CURRENCY_MASK_CONFIG, 
      useValue: CustomCurrencyMaskConfig 
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
