import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecurityDetailsComponent } from './login-security-details.component';

describe('LoginSecurityDetailsComponent', () => {
  let component: LoginSecurityDetailsComponent;
  let fixture: ComponentFixture<LoginSecurityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSecurityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecurityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
