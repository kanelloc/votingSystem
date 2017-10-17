import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { UserAuthService } from '../auth/users/user-auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class VoterService {

	authToken: any;

  constructor(
  	private http: Http,
  	private userAuthService: UserAuthService) { }

  getAllCandidates(){
  	let headers = new Headers();
  	this.authToken = localStorage.getItem('id_token');
  	console.log(this.authToken);
  	headers.append('Authorization', this.authToken);
  	return this.http.get('http://localhost:3000/voter/candidates', {headers: headers}).map(res => res.json());
  }

  getProfile(){
  	let headers = new Headers();
    this.loadToken();
    console.log(this.authToken);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
  	return this.http.get('http://localhost:3000/voter/profile', {headers: headers}).map(res => res.json());

  }

  submitVote(candidate){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/voter/vote',candidate, {headers:headers}).map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
