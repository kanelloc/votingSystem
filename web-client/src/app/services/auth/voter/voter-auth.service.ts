import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class VoterAuthService {
	authToken: any;
  voter: any;
  user: any;
  current_voter: any;

  constructor(private http: Http) { }

  /**
   * Register voter (Service)
   * @param voter 
   */
  registerVoter(user, type){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (type == 'voter'){
      return this.http.post('http://localhost:3000/auth/voter/register', user,{headers: headers})
      .map(res => res.json());
    } else if (type == 'candidate') {
      return this.http.post('http://localhost:3000/auth/candidate/register', user,{headers: headers})
      .map(res => res.json());
    }
  }

  /**
   * Authentice voter (Service)
   * @param voter 
   */
  authenticateVoter(voter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/auth/voter/login', voter,{headers: headers})
      .map(res => res.json());
  }

  /*
   |--------------------------------------------------------------------------
   | Authenticated User Services
   |--------------------------------------------------------------------------
  */

  /*
   |--------------------------------------------------------------------------
   | Store, Load Token, Logout
   |--------------------------------------------------------------------------
  */

  /**
   * Store data after Login (Service)
   * @param token 
   * @param user 
   */
  storeVoterData(token, voter){
    localStorage.setItem('id_token', token);
    localStorage.setItem('voter', JSON.stringify(voter));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  loadVoter(){
    var voter = localStorage.getItem('voter');
    return this.current_voter= JSON.parse(voter);
  }

}
