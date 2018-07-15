import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveButtonComponent } from './responsive-button.component';

describe('ResponsiveButtonComponent', () => {
  let component: ResponsiveButtonComponent;
  let fixture: ComponentFixture<ResponsiveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
