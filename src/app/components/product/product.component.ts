import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @ViewChild('featuredImage') featuredImage: ElementRef;

  @Output() add = new EventEmitter<Product>();
  @Output() like = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {

    setTimeout(() => {this.lazyLoad();}, 300);

  }

  lazyLoad() {

    $(this.featuredImage.nativeElement).visibility({
      type: 'image',
      transition : 'fade in',
      duration   : 1000
    });

  }

  get discountPrice(): number {
    return this.product.price * (100 - this.product.discount) / 100;
  }

  emitAdd() {
    this.add.emit(this.product);
  }

  emitLike() {
    this.like.emit(this.product);
  }

}
