import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../../services/auth/users/user-auth.service';

@Component({
  selector: 'app-canidate-login',
  templateUrl: './canidate-login.component.html',
  styleUrls: ['./canidate-login.component.css']
})
export class CanidateLoginComponent implements OnInit {
  
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private _service: NotificationsService,
    private userAuthService: UserAuthService,
    private router: Router) { }

    public options = {
        position: ["top", "right"],
        timeOut: 0,
        lastOnBottom: true,
    };

  ngOnInit() {
  }

  onLoginSubmit(){
    var candidate = {
      email: this.email,
      password: this.password
    }

    //- Empty fields validation.
    if (!this.validateService.validateLogin(candidate)) {
      var msg = 'Fill the empty fields';
      this.createNotification('error', msg);
      return false;
    }

    //- Email validation.
    if (!this.validateService.validateEmail(candidate.email)) {
      var msg = 'Wrong type of email';
      this.createNotification('error', msg);
      return false;
    }

    this.userAuthService.authenticateUser(candidate, 'candidate').subscribe(data => {
      if(data.success){
        this.userAuthService.storeUserData(data.token, data.candidate, 'user');
        console.log('Loged in');
        this.router.navigate(['candidate/profile']);
      } else {
        this.createNotification('error', data.msg);
      }
    });
  }

  createNotification(type, msg) {
    if (type === 'error') {
      this._service.error(
            'Login Error',
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
