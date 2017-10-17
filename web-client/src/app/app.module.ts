import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//- Custom imports
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//- External imports
import { SimpleNotificationsModule } from 'angular2-notifications';

//- Components imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { VoterLoginComponent } from './components/auth/voter/voter-login/voter-login.component';
import { VoterRegisterComponent } from './components/auth/voter/voter-register/voter-register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilePageComponent } from './components/voter/profile-page/profile-page.component';

//- Services imports
import { ValidateService } from './services/validation/validate.service';
import { VoterService } from './services/voter/voter.service';
//-- Auth services.
import { VoterAuthService } from './services/auth/voter/voter-auth.service';
import { UserAuthService } from './services/auth/users/user-auth.service';
import { CanidateLoginComponent } from './components/auth/candidate/canidate-login/canidate-login.component';
import { CanidateRegisterComponent } from './components/auth/candidate/canidate-register/canidate-register.component';
import { CandidateProfilePageComponent } from './components/candidate/candidate-profile-page/candidate-profile-page.component';
import { VotingPageComponent } from './components/voter/voting-page/voting-page.component';
//-Routes declaration
const appRoutes = [
{path: '', component: HomeComponent},
{path: 'register', component: VoterRegisterComponent},
{path: 'login', component: VoterLoginComponent},
{path: 'candidate/register', component: CanidateRegisterComponent},
{path: 'candidate/login', component: CanidateLoginComponent},
{path: 'voter/profile', component: ProfilePageComponent},
{path: 'voter/voting', component: VotingPageComponent},
{path: 'candidate/profile', component: CandidateProfilePageComponent}]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VoterLoginComponent,
    VoterRegisterComponent,
    HomeComponent,
    ProfilePageComponent,
    CanidateLoginComponent,
    CanidateRegisterComponent,
    CandidateProfilePageComponent,
    VotingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService, VoterAuthService, VoterService, UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
