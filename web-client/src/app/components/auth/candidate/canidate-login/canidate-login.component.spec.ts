import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanidateLoginComponent } from './canidate-login.component';

describe('CanidateLoginComponent', () => {
  let component: CanidateLoginComponent;
  let fixture: ComponentFixture<CanidateLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanidateLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanidateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
