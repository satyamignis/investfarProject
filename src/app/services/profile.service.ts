import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  @Output() updateProfile: EventEmitter<any> = new EventEmitter();  
  constructor() { }

}
