import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;

  @Output() edit = new EventEmitter<Address>();
  @Output() remove = new EventEmitter<Address>();

  icons = {
    'home': 'home',
    'office': 'building'
  };

  constructor() { }

  ngOnInit() {
  }

  get typeIcon() {
    return this.icons[this.address.type];
  }

  emitEdit() {
    this.edit.emit(this.address);
  }

  emitRemove() {
    this.edit.emit(this.address);
  }

}
