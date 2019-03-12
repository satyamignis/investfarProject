import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MyModalService } from '../services/my-modal.service';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-invoice-detail-screen',
  templateUrl: './invoice-detail-screen.component.html',
  styleUrls: ['./invoice-detail-screen.component.css']
})
export class InvoiceDetailScreenComponent implements OnInit {

  @Input() data : any;
  @Input() type : any; // company // user
  @Input() activeTab : any;
  user : any;

  constructor(
    public activeModal: NgbActiveModal,
    private myModalService : MyModalService,
    private apiService : ApiService,
    private myCookieService : MyCookieService,
    private myToasterService : ToastrService
  ) { }

  ngOnInit() {
    this.user = this.myCookieService.getCookie('user');
    console.log(this.data);
    console.log(this.type);
    console.log(this.activeTab);
  }

  doAction(status){
    console.log(status);
    this.activeModal.dismiss();
    this.myModalService.bookingManagementAction.emit({ id : this.data.bookedId ,status : status});
  }

  setDefaultPic(){
    this.data.image = './assets/images/resource/pro-tab-dummy.jpg';
  }
  
  shieldPay(){
    this.activeModal.close();
    let winName = 'MyWindow';
    let winURL = this.apiService.getShieldPayUrl() ;
    // Amount=100&FromEmail=sender@mailinator.com&ToEmail=receiver@mailinator.com&ALLURL=http://www.shieldpay.com&RequestFrom=EcomNew.html&PaymentMethod=ALL&LANGUAGE=en_US&CurrencyCode=GBP
    let price = this.data.maxPrice.replace('$','');
    let feeReceiverAmount = this.data.tax.replace('$', '');
    let params = { 
      FromEmail : this.user.email,
      Amount : +price,
      ToEmail : this.data.company_email,
      FeeReceiverEmail : this.user.super_admin_email,
      FeeReceiverAmount : feeReceiverAmount, 
      ALLURL : window.location.origin + '/my-booked-services/'+ this.data.bookedId,
      RequestFrom : 'EcomNew.html',
      PaymentMethod : 'ALL',
      LANGUAGE : 'en_US',
      CurrencyCode : 'USD'
    };       
    console.log(params)  
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', winURL);
    form.setAttribute('target','self');  
    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = params[i];
        form.appendChild(input);
      }
    }              
    document.body.appendChild(form);                       
    window.open('', winName);
    form.target = winName;
    form.submit();                 
    document.body.removeChild(form); 
  }
}
