import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddressPageComponent } from './my-address-page.component';

describe('MyAddressPageComponent', () => {
  let component: MyAddressPageComponent;
  let fixture: ComponentFixture<MyAddressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAddressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
