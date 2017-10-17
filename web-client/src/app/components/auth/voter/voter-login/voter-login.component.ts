import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { VoterAuthService } from '../../../../services/auth/voter/voter-auth.service';

@Component({
  selector: 'app-voter-login',
  templateUrl: './voter-login.component.html',
  styleUrls: ['./voter-login.component.css']
})
export class VoterLoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private _service: NotificationsService,
    private voterAuthService: VoterAuthService,
    private router: Router) { }

    public options = {
        position: ["top", "right"],
        timeOut: 0,
        lastOnBottom: true,
    };

  ngOnInit() {
  }

  onLoginSubmit(){
    var voter = {
      email: this.email,
      password: this.password
    }

    //- Empty fields validation.
    if (!this.validateService.validateLogin(voter)) {
    	var msg = 'Fill the empty fields';
      this.createNotification('error', msg);
      return false;
    }

    //- Email validation.
    if (!this.validateService.validateEmail(voter.email)) {
    	var msg = 'Wrong type of email';
      this.createNotification('error', msg);
      return false;
    }

    this.voterAuthService.authenticateVoter(voter).subscribe(data => {
      if(data.success){
        console.log(data);
        this.voterAuthService.storeVoterData(data.token, data.voter);
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
