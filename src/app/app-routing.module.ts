import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticatedGuard } from './authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard] // <- add this!
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticatedGuard] // <- add this!
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
