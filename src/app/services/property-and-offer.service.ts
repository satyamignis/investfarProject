import { Injectable } from '@angular/core';
import { PropertyTypes } from './property-types';
import { OfferTypes } from './offer-types';

@Injectable({
  providedIn: 'root'
})
export class PropertyAndOfferService {
  propertyTypes = [];
  offerTypes = [];

  constructor() {
    this.propertyTypes = PropertyTypes;
    this.offerTypes = OfferTypes;
  }

  getOfferTypeKeyValue(offer, flag) {
    let value: any = 0;
    // if (offer == 'sell') offer = 'sale'
    for (let o of this.offerTypes) {
      if (flag == 'value') {
        if (o.text.toLowerCase() == offer.toLowerCase().replace(/-/g, ' ')) {
          value = o.value
        }
      }
      if (flag == 'key') {
        if (o.value == offer) {
          value = o.text.toLowerCase().replace(/ /g, '-')
        }
      }
    }
    return value;
  }

  getPropertyKeyTypeValue(propery, flag) {
    let value: any = 0;
    for (let p of this.propertyTypes) {
      if (flag == 'value') {
        if (p.text.toLowerCase() == propery.toLowerCase().replace(/-/g, ' ')) {
          value = p.value
        }
      }
      if (flag == 'key') {
        if (p.value == propery) {
          value = p.text.toLowerCase().replace(/ /g, '-')
        }
      }
    }
    return value;
  }
}
