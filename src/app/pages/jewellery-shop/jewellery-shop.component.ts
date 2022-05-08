import { Component, OnInit } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { JewelleryShopService } from '../../shared/services/jewellery-shop.service';


@Component({
  selector: 'app-jewellery-shop',
  templateUrl: './jewellery-shop.component.html',
  styleUrls: ['./jewellery-shop.component.scss']
})
export class JewelleryShopComponent implements OnInit {

  jewelleryObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private jewelleryShopService: JewelleryShopService) {

  }

  ngOnInit(): void {
    this.jewelleryShopService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      this.jewelleryObject = data;
    })
  }

  loadImage(imageObject: Image){
    this.chosenImage = imageObject;
  }



}
