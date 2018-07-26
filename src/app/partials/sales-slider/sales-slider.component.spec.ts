import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSliderComponent } from './sales-slider.component';

describe('SalesSliderComponent', () => {
  let component: SalesSliderComponent;
  let fixture: ComponentFixture<SalesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
