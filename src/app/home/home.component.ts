import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyCookieService } from '../services/my-cookie-service';
import { RoutingStateService } from '../services/routing-state.service';
import { Router } from '@angular/router';
import { PropertyTypes } from '../services/property-types';



declare const $: any;
declare const AmCharts: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	numVisible = 0;
	propertyTypes = [];
	offerTypes = [];
	citiesOptions = [];
	filter : any = {};
	user:any;
	properties = [];
	totalCount = 0;
	apiLoading:boolean;
	cities : any = [];


	customOptions: any = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: true,
	    autoplay:true,
	    navSpeed: 1500,
	    animateIn: 'slideOutDown',
	    items:1,
	    nav: false
	}

	showAdvBtn:any=true;
	preloadimg:any;
	constructor(
		private api:ApiService,
		private myCookieService : MyCookieService,
		private routingStateService : RoutingStateService,
		private router : Router
		) { }

	ngOnInit() {
	  		  window.scrollTo(0, 0);
			  /*%%%%%%%%%%%%% Map %%%%%%%%%%%%%%*/
			  var map = AmCharts.makeChart( "chartdiv", {
			  "type": "map",
			  "theme": "light",
			  "projection": "miller",

			  "dataProvider": {
			    "map": "worldLow",
			    "getAreasFromMap": true
			  },
			  "areasSettings": {
			    "autoZoom": false,
			    "selectedColor": "#CC0000"
			  },
			  "smallMap": {},
			  "listeners": [{
			    "event": "init",
			    "method": function(e) {
			      
			      var map = e.chart;
			      
			       /**
			       * Log initial zoom settings
			       */
			      map.initialZoom = {
			        "zoomLevel": e.chart.zoomLevel(),
			        "zoomLongitude": e.chart.zoomLongitude(),
			        "zoomLatitude": e.chart.zoomLatitude()
			      };
			    }
			  }],
			  "export": {
			    "enabled": true,
			    "position": "bottom-right",
			    "beforeCapture": function() {
			      var map = this.setup.chart;
			      /**
			       * Log current zoom settings so we can restore after export
			       */
			      map.currentZoom = {
			        "zoomLevel": map.zoomLevel(),
			        "zoomLongitude": map.zoomLongitude(),
			        "zoomLatitude": map.zoomLatitude()
			      };
			      
			      /**
			       * Zoom to initial position
			       */
			      map.zoomToLongLat(
			        map.initialZoom.zoomLevel,
			        map.initialZoom.zoomLongitude,
			        map.initialZoom.zoomLatitude,
			        true
			      );
			    },
			    "afterCapture": function() {
			      var map = this.setup.chart;
			      setTimeout(function() {
			        /**
			         * Restore current zoom
			         */
			        map.zoomToLongLat(
			          map.currentZoom.zoomLevel,
			          map.currentZoom.zoomLongitude,
			          map.currentZoom.zoomLatitude,
			          true
			        );
			      }, 10);
			    }
			  }
			});

	    this.preloadimg=true;
        setTimeout(() => {  
           this.preloadimg=false;
        }, 1000);

        this.user = this.myCookieService.getCookie('user');
		this.propertyTypes = PropertyTypes;
	    this.clearFilter(); 
	    this.getCities();
	}


	getCities(){
		this.api.apiPostData('available_in_this_cities', {})
		.subscribe(
			(response : any) => {
				if(response.errorCode == '0'){
					this.cities = response.data;
					this.cities = this.cities.filter((c) => c.city != null);
					if(response.data.length > 6){
						this.numVisible = 6
					} else {
						this.numVisible = response.data.length;
					}
				} else {
					console.log('------error-------')
				}
			},
			(error: any) => {
				console.log(error);
			}
		)
	}

	onSearch(type){

		if(type == 'btn'){
			this.properties = [];
		}
		let filtered_property_data = this.getFilterProperty().filtered_property_data;
		for (let key in this.filter) {
			if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null) 
				filtered_property_data[key] = this.filter[key]
		}
			this.api.apiPostData('get_filtered_property', filtered_property_data)
			.subscribe(
				(response : any) => {
					if(response.errorCode == '0'){
						this.properties = [...this.properties, ...response.data];
						this.totalCount = response.total_count;
						if(this.properties.length == this.totalCount){
						} 
						if(type == 'btn'){ /*this.scrollToDiv();*/}
					} else {
						console.log('------error-------')
					}
					this.apiLoading=false;

				},
				(error: any) => {
					console.log(error);
				}
			)
	}	


	getFilterProperty(){
		let filtered_property_data : any = {};
		let length = 0;
		for (let key in this.filter) {
			if( this.filter[key] != 0 && this.filter[key] != '' && this.filter[key] != null) {
				filtered_property_data[key] = this.filter[key];
				length++;
			}
		}
		return { filtered_property_data, length }
	}


	clearFilter(){
		this.filter = {
			property_type : 0,
			offer_type : 0,
			city : '',
			// min_price : 0,
			// max_price : 0,
			from_bed_rooms : 0,
			to_bed_rooms : 0,
			from_bath_rooms : 0,
			to_bath_rooms : 0,
			from_rating : 0,
			to_rating : 0,
			// from_property_size : 0,
			// to_property_size : 0,
			from_year: 0,
			to_year : 0,
			// from_lot_size : 0,
			// to_lot_size : 0,
			// stories : 0,
			// condition : '',
			// garage_carport : 0,
			// pool : 0,
			// asking_price : 0,
			live : '',
			reason_of_selling : '',
			keyword : '',
			page_no : 1,
			// home : ''
		};
		this.properties = [];
	    this.apiLoading=true;
		this.onSearch('');
	}

	loadMoreProperties(){
	    this.apiLoading=true;
		this.filter.page_no++;
		this.onSearch('');
	}

	openAdvanceOpt(){
		$('#target').show('slow');
		this.showAdvBtn = false;
	}

	hideAdvanceOpt(){
		$('#target').hide('slow');
		this.showAdvBtn = true;
	}

}
