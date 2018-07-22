import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { formatDate } from '../../helpers';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCalendarComponent),
    multi: true
  }]
})
export class InputCalendarComponent implements OnInit, ControlValueAccessor {

  private _value: Date;

  @ViewChild('calendar') calendar: ElementRef;

  @Input() placeholder: string;
  @Input() min: string;
  @Input() max: string;
  @Input() type: string;
  @Input() initial: string;

  @Output() change = new EventEmitter<Date>();
  @Output() hide = new EventEmitter<Date>();
  @Output() show = new EventEmitter<Date>();

  onChange: (_:any) => void = (_:any) => {};
  onTouched: () => void = () => {};

  constructor() { }

  ngOnInit() {

    $(this.calendar.nativeElement).calendar({
      type: this.type,
      minDate: this.min? new Date(this.min): null,
      maxDate: this.max? new Date(this.max): null,
      initialDate: this.initial? new Date(this.initial): null,
      onChange: (date, settings) => {
        if(this.value.getTime() !== date.getTime()) this.value = date;
      },
      onHide: (date, settings) => this.hide.emit(date),
      onShow: (date, settings) => this.show.emit(date),
    });

  }

  get value(): Date {
    return this._value;
  }

  @Input()
  set value(val: Date) {
    this._value = val;
    $(this.calendar.nativeElement).calendar('set date', val);
    this.onChange(val);
    this.change.emit(val);
  }

  writeValue(val: Date) {
    this.value = val;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
