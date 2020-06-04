import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbAuthService } from '../../auth/services/auth.service';
import { NbMenuService, NbThemeService, NbMediaBreakpointsService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../core/mock/users.service';
import { LayoutService } from '../../core/utils';
import { NbAuthJWTToken } from '../../auth/services/token/token';
import {map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit , OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: String = 'https://img.icons8.com/dusk/64/000000/user-male-circle--v1.png';
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';


  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {

                this.authService.onTokenChange()
                .subscribe((token: NbAuthJWTToken) => {

                  if (token.isValid()) {
                    this.user = token.getPayload();
                    console.log(this.user);

                    // here we receive a payload from the token and assigns it to our `user` variable
                  }
                });
              }

              ngOnInit() {
                this.currentTheme = this.themeService.currentTheme;

                  this.userService.onUserChange()
                  .subscribe((user: any) => {this.user = user;
                                         console.log(this.user);
                                        });

                const { xl } = this.breakpointService.getBreakpointsMap();
                this.themeService.onMediaQueryChange()
                  .pipe(
                    map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                    takeUntil(this.destroy$),
                  );
                  // .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

                this.themeService.onThemeChange()
                  .pipe(
                    map(({ name }) => name),
                    takeUntil(this.destroy$),
                  )
                  .subscribe(themeName => this.currentTheme = themeName);
              }

              ngOnDestroy() {
                this.destroy$.next();
                this.destroy$.complete();
              }

              changeTheme(themeName: string) {
                this.themeService.changeTheme(themeName);
              }

              toggleSidebar(): boolean {
                this.sidebarService.toggle(true, 'menu-sidebar');
                this.layoutService.changeLayoutSize();

                return false;
              }

              navigateHome() {
                this.menuService.navigateHome();
                return false;
              }

}
