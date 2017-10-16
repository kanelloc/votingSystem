import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//- Custom imports
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//- Components imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { VoterLoginComponent } from './components/auth/voter/voter-login/voter-login.component';
import { VoterRegisterComponent } from './components/auth/voter/voter-register/voter-register.component';
import { HomeComponent } from './components/home/home.component';

//- Services imports
import { ValidateService } from './services/validation/validate.service';

//-Routes declaration
const appRoutes = [
{path: '', component: HomeComponent},
{path: 'register', component: VoterRegisterComponent},
{path: 'login', component: VoterLoginComponent}]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VoterLoginComponent,
    VoterRegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
