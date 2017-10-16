import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validation/validate.service'

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

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(user);
    console.log(users);
    //- Validation section.
    //- Email validation.
    if (!this.validateService.validateEmail(user.email)) {
    	console.log('Not a valid email');
    }
    //- Empty fields validation.
    if (!this.validateService.validateRegister(user)) {
    	console.log('Empty fields');
    }
    //- Confirm password validation.
    if (!this.validateService.validatePassword(user.password, this.password_confirmation)) {
    	console.log('Passwords missmatch!');
    }


  }


}
