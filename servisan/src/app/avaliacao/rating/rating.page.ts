import { AvaserviceService } from './../services/avaservice.service';
import { Component, Input, Output, EventEmitter,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage {
  @Input() numStars: number = 5;
  @Input() value: number = 1;

  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();

  stars: String[] = [];

  constructor() {}

  ngAfterViewInit(){
    this.calc();
    }
    calc(){
    this.stars = []; 
    let tmp = this.value;
    for (let i=-0; i < this.numStars; i++, tmp--){
      if(tmp >= 1)
      this.stars.push("star");
    else if(tmp > 0 && tmp < 1)
      this.stars.push("star-half");
    else this.stars.push("star-outline");
    }
  }

  starClicked(index){
    console.log(index);
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
  }

}
