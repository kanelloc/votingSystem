import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { UserAuthService } from '../../../../services/auth/users/user-auth.service';

@Component({
  selector: 'app-voter-register',
  templateUrl: './voter-register.component.html',
  styleUrls: ['./voter-register.component.css']
})
export class VoterRegisterComponent implements OnInit {
	username: String;
	email: String;
	password: String;
	password_confirmation: String;

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
    const voter = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(voter);
    //- Validation section.
    //- Email validation.
    if (!this.validateService.validateEmail(voter.email)) {
    	var msg = 'Invalid email';
      this.createNotification('error', msg);
      return false;

    }
    //- Empty fields validation.
    if (!this.validateService.validateRegister(voter)) {
    	var msg = 'Fill the empty fields';
      this.createNotification('error', msg);
      return false;
    }
    //- Confirm password validation.
    if (!this.validateService.validatePassword(voter.password, this.password_confirmation)) {
    	var msg = 'Passwords missmatch';
      this.createNotification('error', msg);
      return false;
    }

    this.userAuthService.registerUser(voter, 'voter').subscribe(data => {
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
