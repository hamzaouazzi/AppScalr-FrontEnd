import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

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
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { NbAuthService } from './services/auth.service';
import { NbAuthSimpleToken, NbAuthTokenClass, NbAuthJWTToken } from './services/token/token';
import { NbTokenLocalStorage, NbTokenStorage } from './services/token/token-storage';
import { NbTokenService } from './services/token/token.service';
import { NbAuthTokenParceler, NB_AUTH_FALLBACK_TOKEN } from './services/token/token-parceler';
import { NbAuthStrategy } from './strategies/auth-strategy';
import { NbAuthStrategyOptions } from './strategies/auth-strategy-options';
import { NbDummyAuthStrategy } from './strategies/dummy/dummy-strategy';
import { NbOAuth2AuthStrategy } from './strategies/oauth2/oauth2-strategy';
import { NbPasswordAuthStrategy } from './strategies/password/password-strategy';

import {
  defaultAuthOptions,
  NB_AUTH_INTERCEPTOR_HEADER,
  NB_AUTH_OPTIONS,
  NB_AUTH_STRATEGIES,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NB_AUTH_TOKENS,
  NB_AUTH_USER_OPTIONS,
  NbAuthOptions,
  NbAuthStrategyClass,
} from './auth.options';

import { NbAuthComponent } from './components/auth.component';

import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';

import { deepExtend } from './helpers';
import { environment } from '../../environments/environment';
import { AuthGuard } from '../auth-guard.service';
import { NbAuthJWTInterceptor } from './services/interceptors/jwt-interceptor';
// import { NgxAuthRoutingModule } from './auth-routing.module';


export function nbStrategiesFactory(options: NbAuthOptions, injector: Injector): NbAuthStrategy[] {
  const strategies = [];
  options.strategies
    .forEach(([strategyClass, strategyOptions]: [NbAuthStrategyClass, NbAuthStrategyOptions]) => {
      const strategy: NbAuthStrategy = injector.get(strategyClass);
      strategy.setOptions(strategyOptions);

      strategies.push(strategy);
    });
  return strategies;
}

export function nbTokensFactory(strategies: NbAuthStrategy[]): NbAuthTokenClass[] {
  const tokens = [];
  strategies
    .forEach((strategy: NbAuthStrategy) => {
      tokens.push(strategy.getOption('token.class'));
    });
  return tokens;
}

export function nbOptionsFactory(options) {
  return deepExtend(defaultAuthOptions, options);
}

export function nbNoOpInterceptorFilter(req: HttpRequest<any>): boolean {
  return true;
}

@NgModule({
  declarations: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NbSpinnerModule,
    NbIconModule,
    NbSelectModule,
    NbThemeModule.forRoot({ name: 'default' }),
  ],

  exports: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
  ],
})
export class NbAuthModule {
  static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders<NbAuthModule> {
    return {
      ngModule: NbAuthModule,
      providers: [
        AuthGuard,
        { provide: APP_BASE_HREF, useValue: '/' },
        // { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
        { provide: NB_AUTH_USER_OPTIONS, useValue: nbAuthOptions },
        { provide: NB_AUTH_OPTIONS, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS] },
        { provide: NB_AUTH_STRATEGIES, useFactory: nbStrategiesFactory, deps: [NB_AUTH_OPTIONS, Injector] },
        { provide: NB_AUTH_TOKENS, useFactory: nbTokensFactory, deps: [NB_AUTH_STRATEGIES] },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function (req: HttpRequest<any>) {
          if (req.url === `${environment.base_url}/auth/login`) {
          return true
          } else {
           return false
          }
       } },
       // { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: nbNoOpInterceptorFilter },
        /* { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: function (req: HttpRequest<any>) {
          if (req.url === `${environment.base_url}/auth/login`) {
          return true
          }
          if (req.url === `${environment.base_url}/auth/refresh/token`) {
            return true
          } else {
           return false
          }
       } }, */
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        NbAuthTokenParceler,
        NbAuthService,
        NbTokenService,
        NbDummyAuthStrategy,
        NbPasswordAuthStrategy,
        NbOAuth2AuthStrategy,
      ],
    };
  }
}
