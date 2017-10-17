import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanidateRegisterComponent } from './canidate-register.component';

describe('CanidateRegisterComponent', () => {
  let component: CanidateRegisterComponent;
  let fixture: ComponentFixture<CanidateRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanidateRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanidateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
