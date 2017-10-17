import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateAuthService {
	authToken: any;
  voter: any;
  current_voter: any;

  constructor(private http: Http) { }

}
