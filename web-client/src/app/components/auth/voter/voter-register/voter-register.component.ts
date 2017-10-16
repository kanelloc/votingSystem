import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service';
import { NotificationsService } from 'angular2-notifications';

import { VoterAuthService } from '../../../../services/auth/voter/voter-auth.service';

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
    private voterAuthService: VoterAuthService) { }

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

    }
    //- Empty fields validation.
    if (!this.validateService.validateRegister(voter)) {
    	var msg = 'Fill the empty fields';
    	this.createNotification('error', msg);
    }
    //- Confirm password validation.
    if (!this.validateService.validatePassword(voter.password, this.password_confirmation)) {
    	var msg = 'Passwords missmatch';
    	this.createNotification('error', msg);
    }

    this.voterAuthService.registerVoter(voter).subscribe(data => {
      if (data == 'success') {
        console.log('gg');
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
