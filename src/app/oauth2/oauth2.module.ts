import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';

import { OAuth2LoginComponent } from './oauth2-login.component';
import { OAuth2CallbackComponent } from './oauth2-callback.component';
import { Oauth2RoutingModule } from './oauth2-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '18426118003-ssitvab7ctitqqsjuv2hujddn7433n0l.apps.googleusercontent.com',
          clientSecret: 'Y7xTgQaKE2ht1H3PCV5eJdWZ',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',

            redirectUri: 'http://localhost:4200/oauth2/callback',
          },

          redirect: {
            success: '/oauth2',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
    Oauth2RoutingModule,
  ],
  declarations: [
    OAuth2LoginComponent,
    OAuth2CallbackComponent,
  ],
})
export class OAuth2Module {
}
