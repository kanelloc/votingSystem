import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService {
	authToken: any;
  user: any;
  current_user: any;

  constructor(private http: Http) { }

  /**
   * Register user (Service)
   * @param voter 
   */
  registerUser(user, type){
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
   * Authentice user (Service)
   * @param user 
   */
  authenticateUser(user, type){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (type == 'voter') {
	    return this.http.post('http://localhost:3000/auth/voter/login', user,{headers: headers})
	      .map(res => res.json());
    } else if (type== 'candidate') {
    	return this.http.post('http://localhost:3000/auth/candidate/login', user,{headers: headers})
      .map(res => res.json());
    }
  }

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
  storeUserData(token, user, type){
    localStorage.setItem('id_token', token);
    localStorage.setItem(type, JSON.stringify(user));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  loadUser(){
    var user = localStorage.getItem('user');
    return this.current_user= JSON.parse(user);
  }

  /**
   * Logout user with total wipe (Service)
   */
  logoutUser(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
