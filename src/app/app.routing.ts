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
import { AuthGaurdService } from './services/auth-gaurd.service';
import { UnAuthGaurdService } from './services/unauth-gaurd.service';
import { SubmitPropertyComponent } from './submit-property/submit-property.component';
import { OfferTypeSellComponent } from './offer-type-sell/offer-type-sell.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { InvestfarComponent } from './investfar/investfar.component';
import { PropertyComponent } from './property/property.component';
import { ComparePropertyComponent } from './compare-property/compare-property.component';
import { MlsPropertyComponent } from './mls-property/mls-property.component';
import { MapComponent } from './map/map.component';
import { UserPropertyComponent } from './user-property/user-property.component';
import { ReviewsComponent } from './reviews/reviews.component';


export const AppRoutes: any = [
    { path: "", component: HomeComponent},
    { path: "contractors", component: ContractorsComponent},
    { path: "companies", component: CompaniesComponent },
    { path: "pricing", component: PricingComponent },
    { path: "login", component: LoginComponent,canActivate : [UnAuthGaurdService]},
    { path: "local-investor-consultant", component: LocalInvestorConsultantComponent },
    { path: "home-improvement-network", component: HomeImprovementNetworkComponent },
    { path: "seminars-events-nvestors-club", component: SeminarsEventsNvestorsClubComponent },
    { path: "valuation", component: ValuationComponent },
    { path: "real-estate-legal-forms", component: RealEstateLegalFormsComponent,canActivate : [AuthGaurdService] },
    { path: "privacy-policy-terms", component: PrivacyPolicyTermsComponent },
    { path: "aboutus", component: AboutusComponent },
    { path: "careers", component: CareersComponent },
    { path: "contact-us", component: ContactUsComponent},
    { path: "contractor-registration", component: CompaniesRegistrationComponent, canActivate : [UnAuthGaurdService] },
    { path: "companies-registration", component: CompaniesRegistrationComponent, canActivate : [UnAuthGaurdService]},
    { path: "real-estate-agent-registration", component: CompaniesRegistrationComponent, canActivate : [UnAuthGaurdService] },
    { path: "my-properties", component: MyPropertiesComponent,canActivate : [AuthGaurdService] },
    { path: "my-favorites", component: MyFavoritesComponent,canActivate : [AuthGaurdService] },
    { path: "my-purchase-history", component: MyPurchaseHistoryComponent,canActivate : [AuthGaurdService] },
    { path: "change-password", component: ChangePasswordComponent,canActivate : [AuthGaurdService] },
    { path: "edit-profile", component: EditProfileComponent,canActivate : [AuthGaurdService] },
    { path: "add-service", component: AddServiceComponent, canActivate : [AuthGaurdService] },
    { path: "my-offered-services", component: MyOfferedServicesComponent, canActivate : [AuthGaurdService] },
    { path: "manage-services", component: ManageServicesComponent },
    { path: "offer-type-rent", component: OfferTypeRentComponent },
    { path: "bank-detail", component: BankDetailComponent, canActivate : [AuthGaurdService] },
    { path: "submit-property", component: SubmitPropertyComponent, canActivate : [AuthGaurdService]},
    { path: "offer-type-sell", component: OfferTypeSellComponent},
    { path: "set-password", component: SetPasswordComponent},
    { path: "forgot-password", component: ForgotPasswordComponent, canActivate : [UnAuthGaurdService]},
    { path: 'edit-property/:id', component: SubmitPropertyComponent, canActivate: [ AuthGaurdService ]},
    { path: 'investfar', component: InvestfarComponent},
    { path: 'edit-service/:id', component: AddServiceComponent, canActivate: [ AuthGaurdService ]},
    { path: 'property/:title', component: PropertyComponent},
    { path: 'compare-property/:title', component: ComparePropertyComponent},
    { path: "mls-property/:title", component: MlsPropertyComponent, canActivate : [AuthGaurdService]},
    { path: "map", component: MapComponent},
    { path: "properties-user/:id/:name", component: UserPropertyComponent},
    { path: "reviews", component: ReviewsComponent,canActivate : [AuthGaurdService] }
    
];

export const AppComponents: any = [
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
    SetPasswordComponent,
    OfferTypeSellComponent,
    InvestfarComponent,
    PropertyComponent,
    MlsPropertyComponent,
    MapComponent,
    UserPropertyComponent,
    ReviewsComponent
];