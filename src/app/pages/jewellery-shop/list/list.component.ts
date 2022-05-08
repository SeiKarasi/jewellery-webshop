import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() jewelleryObjectInput?: Array<any>;
  @Output() imageJewelleryEmitter: EventEmitter<any> = new EventEmitter;
  chosenImage: any;

  constructor() { 
    
  }

  ngOnChanges(){
    if(this.jewelleryObjectInput){
      this.chosenImage = this.jewelleryObjectInput[0];
      this.jewelleryType();
    }
  }


  ngOnInit(): void {
  
  }

  jewelleryType() {
    this.imageJewelleryEmitter.emit(this.chosenImage);
  }

}
