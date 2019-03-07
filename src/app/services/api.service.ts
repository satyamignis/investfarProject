import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = '';

  constructor(private http: HttpClient) {

  }
    /*File URL*/
    getFileURL() {
        return '';
    }

    /*Services Key*/
    getservicesKey(){
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


}


