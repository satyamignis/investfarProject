import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-property',
  templateUrl: './user-property.component.html',
  styleUrls: ['./user-property.component.css']
})
export class UserPropertyComponent implements OnInit {

  params : any;
  totalCount = 0;
  loadMoreSpan = true;
  properties = [];
  page_no = 0;
  limit = 10;
  preloadimg:any;
  apiLoading:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService : ApiService,
    private router : Router,
    ) { }

  ngOnInit() {

    window.scrollTo(0, 0);
    this.preloadimg=true;
    setTimeout(() => {  
      this.preloadimg=false;
    }, 1000);

    this.activeRoute.params
    .subscribe((params) => {
      console.log(params);
      this.params = params;
      this.getProperties();
    })
  }

  getProperties(){
    this.apiLoading=true;
    this.apiService.apiPostData('get_filtered_property', {
      user_id : this.params.id,
      page_no : this.page_no,
      limit : this.limit
    })
    .subscribe(
      (response : any) => {
        console.log(response)
        if(response.errorCode == '0'){
          this.properties = [...this.properties, ...response.data];
          this.totalCount = response.total_count;
          if(this.properties.length == this.totalCount){
            this.loadMoreSpan = false;
          }
        } else {
        }
        this.apiLoading=false;

      },
      (error: any) => {
        console.log(error);
        this.apiLoading=false;
      }
      )
  }
  
  loadMoreProperties(){
    this.loadMoreSpan = true;
    this.page_no++;
    this.getProperties();
  }

  getDetails(id){
    this.router.navigate(['/property/'+id]);
  }
}

