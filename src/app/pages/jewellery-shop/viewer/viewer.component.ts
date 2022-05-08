import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comment';
import { JewelleryShopService } from '../../../shared/services/jewellery-shop.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {


  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;

  priceInt?: number;

  comments: Array<Comment> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  })

  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private jewelleryShopService: JewelleryShopService,
    private commentService: CommentService,
    private userService: UserService) {

  }

  ngOnChanges(): void {
    this.priceInt = undefined;
    
    if(this.imageInput?.id){
      this.imageInput.price = (Number(this.imageInput.price.split(' ')[0])/this.imageInput.count) +' Ft'; 
      this.imageInput.count = 1;
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.jewelleryShopService.loadImage(this.imageInput.photo_location).subscribe(data => {
        this.loadedImage = data;

      });
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      })
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data =>{
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error =>{
      console.error(error);
    });
  
  }

  createForm(model: Comment) {
    let formGroup = this.formbuilder.group(model);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(5), Validators.maxLength(850)]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());
        this.commentService.create(this.commentsForm.value)
        .then(_ => {
          this.router.navigateByUrl('/jewellery-shop')
        }).catch(error => {
          console.error(error);
        });

      }
    }
  }

  inc(){
    if(this.imageInput){
      this.imageInput.count = this.imageInput.count + 1;
      if(this.imageInput.count >= 2){
        if(!this.priceInt){
          this.priceInt = Number(this.imageInput.price.split(' ')[0]);
        }
        this.imageInput.price = (Number(this.imageInput.price.split(' ')[0]) + this.priceInt) + " Ft";
      }
    }
  }

  dec(){
    if(this.imageInput){
      if(this.imageInput.count > 1){
        if(!this.priceInt){
          this.priceInt = Number(this.imageInput.price.split(' ')[0]);
        }
        this.imageInput.price = (Number(this.imageInput.price.split(' ')[0]) - this.priceInt) + " Ft";
        this.imageInput.count = this.imageInput.count - 1;
      }
    }
  }

  addToCart(jewellery: Image){
    localStorage.setItem('localCartCount', JSON.stringify(jewellery.count));
  }

  deleteComment(commentid: string, username: string){
    if(username === this.user?.username){
      this.commentService.delete(commentid);
    } else {
      console.log('Nem törölheted másnak a kommentjét!');
    }
    
  }

}
