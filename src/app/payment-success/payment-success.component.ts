import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  preloadimg:any;
  apiLoading:any;
  paymentStatus:any;
  transaction_id:any;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

  	window.scrollTo(0, 0);
		this.preloadimg=true;
		setTimeout(() => {  
			this.preloadimg=false;
		}, 1000);

    this.activeRoute.params
    .subscribe((params) => {
      this.transaction_id = params.tranID;
    });

  }

}
