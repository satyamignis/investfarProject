import {AfterViewInit, Component, OnInit, NgModule} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
declare var SqPaymentForm : any; //magic to allow us to access the SquarePaymentForm lib
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
	preloadimg:any;
	subscriptionis:any;
	paymentForm;
	apiLoading:any;
	planTitle:any;
  planPrice:any;
  product_id:any;
  nonce:any;
  BaseplanPrice:any;
  user:any;
  agree:any = false;
  constructor(
    private apiService:ApiService,
    private http: HttpClient,
    private router: Router,
    private myCookieService : MyCookieService,
    private myToasterService : ToastrService) { }

  ngOnInit() {

    this.user = this.myCookieService.getCookie('user');

    if(localStorage.getItem('planTitle') && localStorage.getItem('planPrice')){
      this.planTitle = localStorage.getItem('planTitle');
      this.BaseplanPrice = localStorage.getItem('planPrice');
      this.product_id=localStorage.getItem('product_id');
    }else{
      this.planTitle='Apprentice';
      this.BaseplanPrice='$54.99';	
      this.product_id='com.investfar.15report_tool';
    }

    window.scrollTo(0, 0);
    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);

    this.paymentSqure();

    /*Base plan*/
    this.planPrice = this.BaseplanPrice;
  }

  checkValue(){
    var extraFeatures = parseFloat(this.BaseplanPrice.replace('$',''));
    $.each($("input[name='extra']:checked"), function(){            
      extraFeatures += parseFloat($(this).val());
    });
    this.planPrice= '$'+extraFeatures.toFixed(2);
  }


  paymentSqure(){
    let vm;
    vm = this;
    // Set the application ID
    var applicationId = "sandbox-sq0idp-hBVxpD53_C1E9LcZ54NUGQ";

    // Set the location ID
    var locationId = "CBASEHxgvHx0qdWLZz6pMApabuAgAQ";
    this.paymentForm = new SqPaymentForm({

      // Initialize the payment form elements
      applicationId: applicationId,
      locationId: locationId,
      inputClass: 'sq-input',
      autoBuild: false,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '.9em'
      }],

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Credit Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Zip Code'

      },

      // SqPaymentForm callback functions
      callbacks: {

        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
         methodsSupported: function (methods) {

           var applePayBtn = document.getElementById('sq-apple-pay');
           var applePayLabel = document.getElementById('sq-apple-pay-label');
           var masterpassBtn = document.getElementById('sq-masterpass');
           var masterpassLabel = document.getElementById('sq-masterpass-label');

           // Only show the button if Apple Pay for Web is enabled
           // Otherwise, display the wallet not enabled message.
           if (methods.applePay === true) {
             applePayBtn.style.display = 'inline-block';
             applePayLabel.style.display = 'none' ;
           }
           // Only show the button if Masterpass is enabled
           // Otherwise, display the wallet not enabled message.
           if (methods.masterpass === true) {
             masterpassBtn.style.display = 'inline-block';
             masterpassLabel.style.display = 'none';
           }
         },
         
        /*
         * callback function: createPaymentRequest
         * Triggered when: a digital wallet payment button is clicked.
         */
         createPaymentRequest: function () {
           // The payment request below is provided as
           // guidance. You should add code to create the object
           // programmatically.
           return {
             requestShippingAddress: true,
             currencyCode: "USD",
             countryCode: "US",
             total: {
               label: "Hakuna",
               amount: "{{REPLACE_ME}}",
               pending: false,
             },
             lineItems: [
             {
               label: "Subtotal",
               amount: "{{REPLACE_ME}}",
               pending: false,
             },
             {
               label: "Shipping",
               amount: "{{REPLACE_ME}}",
               pending: true,
             },
             {
               label: "Tax",
               amount: "{{REPLACE_ME}}",
               pending: false,
             }
             ]
           };
         },
         
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
         cardNonceResponseReceived: function (errors, nonce, cardData)  {
           if (errors) {
             // Log errors from nonce generation to the Javascript console
             console.log("Encountered errors:");
             errors.forEach(function(error) {
               console.log('  ' + error.message);
               $('#errors').html('<div class="alert alert-danger" role="alert">'+error.message+'</div>');
             });

             return;
           }

           //alert('Nonce received: ' + nonce); /* FOR TESTING ONLY */

           // Assign the nonce value to the hidden form field
           // document.getElementById('card-nonce').value = nonce;
           //needs to be extracted from the
           //(<HTMLInputElement>document.getElementById('card-nonce')).value = nonce; //casting so .value will work
           //get this value from the database when the user is logged in
           (<HTMLInputElement>document.getElementById('sq-id')).value = "sandbox-sq0idp-hBVxpD53_C1E9LcZ54NUGQ";        
           // POST the nonce form to the payment processing page
           //(<HTMLFormElement>document.getElementById('nonce-form')).submit();

           vm.postPayment(nonce);
         },
         
        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
         unsupportedBrowserDetected: function() {
           /* PROVIDE FEEDBACK TO SITE VISITORS */
         },
         
        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
         inputEventReceived: function(inputEvent) {
           switch (inputEvent.eventType) {
             case 'focusClassAdded':
             /* HANDLE AS DESIRED */
             break;
             case 'focusClassRemoved':
             /* HANDLE AS DESIRED */
             break;
             case 'errorClassAdded':
             /* HANDLE AS DESIRED */
             break;
             case 'errorClassRemoved':
             /* HANDLE AS DESIRED */
             break;
             case 'cardBrandChanged':
             /* HANDLE AS DESIRED */
             break;
             case 'postalCodeChanged':
             /* HANDLE AS DESIRED */
             break;
           }
         },
         
        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
         paymentFormLoaded: function() {
           /* HANDLE AS DESIRED */
         }
       }
     });
}

requestCardNonce(event) {

	// Don't submit the form until SqPaymentForm returns with a nonce
	event.preventDefault();
	// Request a nonce from the SqPaymentForm object
	this.paymentForm.requestCardNonce();
}
ngAfterViewInit(){
  this.paymentForm.build();
}

postPayment(nonce){

  var userDetails = {'name':$('#name').val(),'email':$('#email').val(), 'city':$('#city').val(),'phone_number':$('#phone_number').val(),'country':$('#country').val()};
  
  let MypostPayment;
  MypostPayment = this;
  this.apiLoading=true;

  /**** Add on user history ****/
  /*Create Customer*/
  $.ajax({
    type: 'POST',
    url: 'https://bklawyer.busnweb.com/squre_payment/createUser.php',
    data: userDetails,
    success: function (resultResp) {
      if(resultResp !='Exception')  {

        var saveCard = {'nonce':nonce,'customer_id':resultResp};
        /* saveCard */
        $.ajax({
          type: 'POST',
          url: 'https://bklawyer.busnweb.com/squre_payment/saveCard.php',
          data: saveCard,
          success: function (isresultResp) {
            if(isresultResp !='Exception') {
              $.ajax({
                type: 'POST',
                url: 'https://bklawyer.busnweb.com/squre_payment/chargeCard.php',
                data: {'customerId':resultResp, 'customerCardId':isresultResp,'amount':MypostPayment.planPrice, 'planTitle':localStorage.getItem('planTitle')},
                success: function (result) {

                  if(result != 'Payment failed'){

                    MypostPayment.addPurchasePlan();
                    /*****************************/
                    MypostPayment.router.navigate(['/makePayment/'+result]);
                  }else{
                    MypostPayment.router.navigate(['/makePayment/PaymentFailed']);
                  }

                  MypostPayment.apiLoading=false;
                }
              })

            }else{
              MypostPayment.router.navigate(['/makePayment/PaymentFailed']);
            }
          }
        })/*save card*/

      }else{
        MypostPayment.router.navigate(['/makePayment/PaymentFailed']);
      }

    }
  })/* End Create Customer*/

  // $.ajax({
    //   type: 'POST',
    //   url: 'https://bklawyer.busnweb.com/squre_payment/process-card.php',
    //   data: {'nonce':nonce,'amount':MypostPayment.planPrice, 'planTitle':localStorage.getItem('planTitle')},
    //   success: function (result) {

      //     if(result != 'Payment failed'){
        //       /**** Add on user history ****/
        //       /*Create Customer*/
        //       // $.ajax({
          //       //   type: 'POST',
          //       //   url: 'https://bklawyer.busnweb.com/squre_payment/createUser.php',
          //       //   data: userDetails,
          //       //   success: function (resultResp) {
            //       //     if(resultResp !='Exception')  {

              //       //               var saveCard = {'nonce':nonce,'customer_id':resultResp};
              //       //               /* saveCard */
              //       //               $.ajax({
                //       //                 type: 'POST',
                //       //                 url: 'https://bklawyer.busnweb.com/squre_payment/saveCard.php',
                //       //                 data: saveCard,
                //       //                 success: function (isresultResp) {
                  //       //                   if(isresultResp !='Exception')  {

                    //       //                       alert(isresultResp);
                    //       //                   }
                    //       //                 }
                    //       //               })/*save card*/

                    //       //     }


                    //       //   }
                    //       // })/* End Create Customer*/

                    //       MypostPayment.addPurchasePlan();
                    //       /*****************************/
                    //       MypostPayment.router.navigate(['/makePayment/'+result]);
                    //     }else{
                      //       MypostPayment.router.navigate(['/makePayment/PaymentFailed']);
                      //     }

                      //     MypostPayment.apiLoading=false;
                      //   }
                      // })
}

                    /*addPurchasePlan function call after payment Success*/
                    addPurchasePlan(){
                      let purchaseData = {
                        userId : this.user.userId,
                        product_id : this.product_id
                      }
                      this.apiService.apiPostData('set_subscription_plans', purchaseData)
                      .subscribe(
                        (response : any) => {
                          if(response.errorCode == '0'){
                            this.myToasterService.success(response.errorMsg, 'Success');
                            this.user.product_id = this.product_id;
                            this.myCookieService.setCookie('user', this.user);
                            //this.router.navigate(['/my-purchase-history']);
                          } else {
                            this.myToasterService.error(response.errorMsg, 'Try Again');
                            //this.router.navigate(['/pricing']);
                          }
                        },
                        (error: any) => {
                          console.log(error);
                        }
                        )
                    }

                  }
