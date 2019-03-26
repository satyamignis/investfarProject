import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MyCookieService {

  private key = 'fsjkldhgs32434kghjghgalfjdqapfhdsfsdfs%%^%mzbvmghgahfhbantydjsdflafdhflaflhfgidfbadk';

  constructor(
    private cookieService: CookieService
  ) { }

  encrypt(message) {
    var cipherText = crypto.AES.encrypt(JSON.stringify(message), this.key).toString();
    return cipherText;
  }
  decrypt(cipherText) {
    var message = crypto.AES.decrypt(cipherText, this.key).toString(crypto.enc.Utf8);
    return message;
  }

  setCookie(key, value) {
    var cipherValue = this.encrypt(value);
    this.cookieService.set(key, cipherValue, 2.222083333333);
  }

  /*forgot password more expire time set*/
  setForgotCookie(key, value) {
    var cipherValue = this.encrypt(value);
    this.cookieService.set(key, cipherValue, 9.99999999999);
  }
 
  getCookie(key): any {
      if (this.checkCookie(key)) {
        var cipherKeyValue = this.cookieService.get(key);
        var plainText = this.decrypt(cipherKeyValue);
        if(key == 'user'){
          plainText = JSON.parse(plainText)
        }
        return plainText;
      } else {
        return;
      }
  }

  deleteCookie(key) {
    this.cookieService.delete(key);
  }

  deleteCookieAll() {
    this.cookieService.delete('user');            
  }

  checkCookie(key) {
    return this.cookieService.check(key);
  }

}
