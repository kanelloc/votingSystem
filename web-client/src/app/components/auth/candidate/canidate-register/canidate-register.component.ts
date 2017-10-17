import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../../services/auth/users/user-auth.service';

@Component({
  selector: 'app-canidate-register',
  templateUrl: './canidate-register.component.html',
  styleUrls: ['./canidate-register.component.css']
})
export class CanidateRegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  password_confirmation: String;ng

  constructor(
    private validateService: ValidateService,
    private _service: NotificationsService,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit() {
  }

  public options = {
        position: ["top", "right"],
        timeOut: 0,
        lastOnBottom: true,
    };

  onRegisterSubmit(){
    const candidate = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(candidate);
    //- Validation section.
    //- Email validation.
    if (!this.validateService.validateEmail(candidate.email)) {
      var msg = 'Invalid email';
      this.createNotification('error', msg);
      return false;

    }
    //- Empty fields validation.
    if (!this.validateService.validateRegister(candidate)) {
      var msg = 'Fill the empty fields';
      this.createNotification('error', msg);
      return false;
    }
    //- Confirm password validation.
    if (!this.validateService.validatePassword(candidate.password, this.password_confirmation)) {
      var msg = 'Passwords missmatch';
      this.createNotification('error', msg);
      return false;
    }

    this.userAuthService.registerUser(candidate, 'candidate').subscribe(data => {
      if (!data.success) {
        this.createNotification('error', data.msg);
      } else {
        this.router.navigate(['/login']);
        console.log('Registered');
      }
    });


  }

  createNotification(type, msg) {
    if (type === 'error') {
      this._service.error(
            'Registration Error',
            msg,
            {
                clickToClose: true,
                maxLength: 20,
                timeOut: 2000,
                showProgressBar: true
            }
        )
      }
    }

}
