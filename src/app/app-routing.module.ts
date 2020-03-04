import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { FolderListComponent } from './folder-list/folder-list.component';
import { MemoUpsertComponent } from './memo-upsert/memo-upsert.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'upsert', pathMatch: 'full' },
      {
        path: 'upsert',
        component: MemoUpsertComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'folder-list',
        component: FolderListComponent,
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
