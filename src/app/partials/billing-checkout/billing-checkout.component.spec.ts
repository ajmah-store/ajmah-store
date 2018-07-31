import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCheckoutComponent } from './billing-checkout.component';

describe('BillingCheckoutComponent', () => {
  let component: BillingCheckoutComponent;
  let fixture: ComponentFixture<BillingCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
