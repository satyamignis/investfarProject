import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  preloadimg:any;
  zoom: number = 10;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  title: any = '';
  markers: marker[] = []

  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {

     window.scrollTo(0, 0);
     this.preloadimg=true;
     setTimeout(() => {  
         this.preloadimg=false;
     }, 1000);

    this.activeRoute.queryParams
      .subscribe((queryParams) => {
        console.log(queryParams)
        if(queryParams.lat && queryParams.lng){
          this.lat = parseFloat(queryParams.lat);
          this.lng = parseFloat(queryParams.lng);
          this.title = queryParams.title
        }
        this.markers.push({
          lat:this.lat,
          lng:this.lng,
          draggable: false
        });
        //console.log(this.lat, this.lng)
      })
  }

  clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
   
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

