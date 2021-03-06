import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NbAuthService} from '../auth/services/auth.service';
import {NbAuthResult} from '../auth/services/auth-result';
import {NbAuthOAuth2Token} from '../auth/services/token/token';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'nb-oauth2-login',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <p>Current User Authenticated: {{ !!token }}</p>
            <p>Current User Token: {{ token|json }}</p>
            <button nbButton status="success" *ngIf="!token" (click)="login()">Sign In with Google</button>
            <button nbButton status="warning" *ngIf="token" (click)="logout()">Sign Out</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class OAuth2LoginComponent implements OnDestroy {

  token: NbAuthOAuth2Token;

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
       /*  if (authResult.isSuccess()) {
          this.router.navigateByUrl('/pages/dashboard');
        } */
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
