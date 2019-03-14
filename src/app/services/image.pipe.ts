import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: any, type: any): any {
    let image = ''
    if(value != null && 
      ( value.includes('amazonaws') 
      || value.includes('s3.amazonaws.com')
      || value.includes('http://graph.facebook.com')
      || value.includes('/public/storage/subCategory/')
      || value.includes('/public/storage/profile/')
      )){
      image = value;
    } else {
      if(type == 'city'){
        // image = 'assets/images/available-1.jpg'
        image = 'assets/images/ic_company_profile_image.png'
      } else if (type == 'property'){
        // image = 'assets/images/detail-img-1.jpg'
        image = 'assets/images/ic_company_profile_image.png'
      } else  if (type == 'profile'){
        // image = 'assets/images/profile_pic.jpg'
        image = 'assets/images/ic_profile_image.png'
      } else if (type == 'property-detail'){
        // image = 'assets/images/detail_slide-1.jpg'
        image = 'assets/images/ic_company_profile_image.png'
      } else if (type == 'sub-category'){
        // image = 'assets/images/find-work-3.jpg'
        image = 'assets/images/ic_company_profile_image.png'
      }
    }
    return image;
  }

}
