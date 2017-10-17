import { Component, OnInit } from '@angular/core';

import { VoterAuthService } from '../../../services/auth/voter/voter-auth.service';
import { UserAuthService } from '../../../services/auth/users/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private voterAuthService: VoterAuthService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.userAuthService.logoutUser();
    this.router.navigate(['/login']);
    return false;
  }

}
