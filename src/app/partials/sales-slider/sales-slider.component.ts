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
      bannerURL: {
        desktop: 'assets/images/banner_placeholder.jpg',
        mobile: 'assets/images/banner_placeholder_mobile.jpg'
      }
    },
    {
      name: 'Second Sale',
      bannerURL: {
        desktop: 'assets/images/banner_placeholder.jpg',
        mobile: 'assets/images/banner_placeholder_mobile.jpg'
      }
    },
    {
      name: 'Third Sale',
      bannerURL: {
        desktop: 'assets/images/banner_placeholder.jpg',
        mobile: 'assets/images/banner_placeholder_mobile.jpg'
      }
    }
  ];

  private _currentSlide: number = 0;
  numSlide: number = 0;
  duration: number = 5000;
  slideInterval: any;

  constructor() { }

  ngOnInit() {

    setTimeout(()=>this.initSlider(),300);

  }

  initSlider() {
    $(".sales-slider").slick({
      autoPlay: true,
      autoPlaySpeed: 5000,
      infinite: true,
      prevArrow: `<div class="ui right attached basic icon button slick-prev"><i class="left arrow icon"></i></div>`,
      nextArrow: `<div class="ui left attached basic icon button slick-next"><i class="right arrow icon"></i></div>`,
      mobileFirst: true
    });
  }

}
