import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArrayList } from '@arjunatlast/jsds';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss']
})
export class SelectAddressComponent implements OnInit {

  @Input() addresses: ArrayList<Address>;
  @Input() activeAddress: Address;

  @Output() next = new EventEmitter();
  @Output() select = new EventEmitter<Address>();

  constructor() { }

  ngOnInit() {
  }

  emitSelect(address: Address) {
    this.select.emit(address);
  }

  emitNext() {
    this.next.emit();
  }

}
