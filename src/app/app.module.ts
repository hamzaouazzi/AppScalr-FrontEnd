import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthBlockComponent } from './auth/components/auth-block/auth-block.component';
import { NbLoginComponent } from './auth/components/login/login.component';
import { NbLogoutComponent } from './auth/components/logout/logout.component';
import { NbRegisterComponent } from './auth/components/register/register.component';
import { NbRequestPasswordComponent } from './auth/components/request-password/request-password.component';
import { NbResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbThemeModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbDatepickerModule,
  NbChatModule,
  NbActionsModule,
} from '@nebular/theme';
import { NbAuthModule } from './auth/auth.module';
import {NbPasswordAuthStrategy} from './auth/strategies/password/password-strategy';
import { NbAuthJWTToken, NbAuthSimpleToken } from './auth/services/token/token';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import {PagesModule} from './pages/pages.module';
import { UserData } from './core/data/users';
import { UserService } from './core/mock/users.service';
import {AuthGuard} from './auth-guard.service';
import {NbAuthService} from './auth/services/auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { OAuth2Module } from './oauth2/oauth2.module';
import { StudioComponent } from './studio/studio.component';
import { StudioModule } from './studio/studio.module';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './theme/pipes';
const socialLinks = [
  {
    url: 'https://github.com/',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    target: '_blank',
    icon: 'google',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbLayoutModule,
    NbAlertModule,
    HttpClientModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCheckboxModule,
    NbIconModule,
    NbActionsModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    StudioModule,
    // PagesModule.forRoot(),
    OAuth2Module,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:8080/api',
          token: {
            class: NbAuthJWTToken,
            key : 'accessToken',
          },
          login: {
            redirect: {
              success: 'pages/dashboard/',
              failure: null, // stay on the same page
            },
            endpoint: '/auth/signin',
            method: 'post',
          },

          register: {
            redirect: {
              success: '/auth/login',
              failure: null, // stay on the same page
            },
            endpoint: '/auth/signup',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',

          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          socialLinks: socialLinks,
        },
        register: {
          socialLinks: socialLinks,
        },
      },
    }),
    NbInputModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
    // AuthGuard,
  ],
  bootstrap: [AppComponent],
  // providers : [AuthGuard, NbAuthModule, NbAuthService],
})
export class AppModule { }
