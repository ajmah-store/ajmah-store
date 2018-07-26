import { Component, OnInit, Input } from '@angular/core';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'sales-slider',
  templateUrl: './sales-slider.component.html',
  styleUrls: ['./sales-slider.component.scss']
})
export class SalesSliderComponent implements OnInit {

  sales: Sale[] = [
    {
      name: 'First Sale',
      bannerURL: 'assets/images/banner_placeholder.jpg'
    },
    {
      name: 'Second Sale',
      bannerURL: 'assets/images/banner_placeholder.jpg'
    },
    {
      name: 'Third Sale',
      bannerURL: 'assets/images/banner_placeholder.jpg'
    }
  ];

  private _currentSlide: number = 0;
  numSlide: number = 0;
  duration: number = 5000;
  slideInterval: any;

  constructor() { }

  ngOnInit() {

    this.numSlide = this.sales.length;
    this.startSlide();

  }
  
  get currentSlide() {
    return this._currentSlide;
  }

  set currentSlide(val: number) {
    this._currentSlide = val;

    //clear interval
    if(this.slideInterval) clearInterval(this.slideInterval);
    this.startSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.numSlide;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide + this.numSlide - 1) % this.numSlide;
  }

  //start auto sliding
  startSlide() {

    //slide every this.duration milli seconds
    this.slideInterval = setInterval(() => {this.nextSlide()}, this.duration);

  }


  get contentStyle(): any {

    return {
      transform: `translateX(-${this.currentSlide*100 / this.numSlide}%)`,
      width: `${this.numSlide*100}%`
    };

  }

}
