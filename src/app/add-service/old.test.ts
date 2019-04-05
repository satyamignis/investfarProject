import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { mapTo } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  online = false;
  ipInfoAPI = '';

  apiURL: string = '';
  
  /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
    /*replace Api after marge dev code with live*/
    PaymentapiURL: string = '';

    /*squre Payment Base Url*/
    squrePaymentgetURL() {
      return '';
    }

    // Add Recurring Card info Method
    addCardRecurring(apiSubUri,setPram){
      return this.http.post(this.PaymentapiURL+apiSubUri,setPram);  
    }

    // Select Recurring Card info Method
    selectCardRecurring(apiSubUri){
      return this.http.get(this.PaymentapiURL+apiSubUri);  
    }

  /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

  constructor(private http: HttpClient,
    private toastr: ToastrService) {
    this.ipInfoAPI = 'https://ipinfo.io';
  }
  /*File URL*/
  getFileURL() {
    return '';
  }

  /*Services Key*/
  getservicesKey(){
    return '';
  }

  getShieldPayUrl(){
    return '';
  }

  // POST Method
  apiPostData(apiSubUri,setPram){
    return this.http.post(this.apiURL+apiSubUri,setPram);
  }

 
  
  // GET Method
  apiGetData(apiSubUri){
    return this.http.get(this.apiURL+apiSubUri);
  }
  
  getYears(){
    let currentYear = new Date().getFullYear();
    let years = [];
    for(let i = currentYear - 200; i < (currentYear + 100); i++){
      years.push(i)
    }
    return years;
  }

  getValuationDetails(requestData): Observable<any>{
    this.checkOnlineStatus();
    if(this.online){
      let headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Basic QTlCOUd2VTanMyeFYxN1ZiY0lNZjFOODVIRW8='
      });

      let options = {
        headers : headers
      }

      return this.http.get(`?address=${requestData.address}&zipcode=${requestData.zipcode}`, options)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          console.log(err);
          this.toastr.error('Report Unavailable', 'Try Again');
          throw (err)
        })
        );
    } else {
      this.toastr.error('No Internet Connection', 'Try Again');
    }
  }


  checkOnlineStatus(){
    let online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
      )
    online.subscribe(value => {
      this.online = value;
    })
  }

  getCurrentIpLocation(): Observable<any> {
    this.checkOnlineStatus();
    if(this.online){
      return this.http.get(this.ipInfoAPI)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err) => {
          console.log(err);
          //this.toastr.error(err.statusText, 'Try Again')
          throw (err)
        })
        );
    } else {
      //this.toastr.error('No Internet Connection', 'Try Again')
    }
  }


}


