import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../shared/models/Image';
import { JewelleryShopService } from '../../shared/services/jewellery-shop.service';
import { CommentService } from '../../shared/services/comment.service';
import { UserService } from '../../shared/services/user.service';
import { User} from '../../shared/models/User';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnChanges {

  

  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private jewelleryShopService: JewelleryShopService,
    private commentService: CommentService,
    private userService: UserService) {

  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  
  }

}
