import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VoterAuthService {
	authToken: any;
	voter: any;

  constructor(private http: Http) { }

  registerVoter(voter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/auth/voter/register', voter,{headers: headers})
      .map(res => res.json());
  }
}
