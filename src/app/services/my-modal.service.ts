import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MyModalService {

  @Output() ratingCompanyToCustomerSuccess: EventEmitter<any> = new EventEmitter();
  @Output() ratingCustomerToCompanySuccess: EventEmitter<any> = new EventEmitter();
  @Output() bookingManagementAction: EventEmitter<any> = new EventEmitter();
  @Output() paySuccess: EventEmitter<any> = new EventEmitter();
  
  constructor() { }
}
