import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'responsive-button',
  templateUrl: './responsive-button.component.html',
  styleUrls: ['./responsive-button.component.scss']
})
export class ResponsiveButtonComponent implements OnInit {

  @Input() icon: string = 'arrow right';
  @Input() primary: boolean;
  @Input() color: string;
  @Input() right: boolean = false;
  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getStyle() {
    return {
      primary: this.primary,
      colored: !!this.color,
      right: this.right,
      loading: this.loading,
      ...this.getColor()
    };
  }

  getColor(): any {

    let color = {};
    if(this.color) color[this.color] = true;
    return color;

  }

}
