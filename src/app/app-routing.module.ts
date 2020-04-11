import { AppComponent } from './app.component';
import { ExtraOptions, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
/* import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from './pages/auth/components'; */
import {NbAuthComponent} from './auth/components/auth.component';
import {NbLoginComponent} from './auth/components/login/login.component';
import {NbLogoutComponent} from './auth/components/logout/logout.component';
import {NbRegisterComponent} from './auth/components/register/register.component';
import {NbRequestPasswordComponent} from './auth/components/request-password/request-password.component';
import {NbResetPasswordComponent} from './auth/components/reset-password/reset-password.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import {WelcomeComponent} from './welcome/welcome.component';
import { AuthGuard } from './auth-guard.service';
import { OAuth2CallbackComponent } from './oauth2/oauth2-callback.component';
import { OAuth2LoginComponent } from './oauth2/oauth2-login.component';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'oauth2/',
    component: OAuth2LoginComponent,
  },
  {
    path: 'oauth2/callback',
    component: OAuth2CallbackComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
