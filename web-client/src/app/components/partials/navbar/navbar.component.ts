import { Component, OnInit } from '@angular/core';

import { VoterAuthService } from '../../../services/auth/voter/voter-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private voterAuthService: VoterAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.voterAuthService.logoutVoter();
    this.router.navigate(['/login']);
    return false;
  }

}
