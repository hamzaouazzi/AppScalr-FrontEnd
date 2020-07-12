import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthService } from './../../../auth/services/auth.service';
import {NbAuthJWTToken} from '../../../auth/services/token/token';
import { UserData } from '../../../core/data/users';
import { LayoutService } from '../../../core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../core/mock/users.service';
import { BugComponent } from './bug/bug.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { Router } from '@angular/router';
import { NbUser } from '../../../auth/models/user';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: NbUser ;
  us:any = {};
  currentUser:NbUser = new NbUser();

  bugs=BugComponent;
  feedbacks=FeedbackComponent;



  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    /* {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    }, */
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out', } ];

  constructor(private router:Router,
              private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
     this.userService.currentUser()
        .subscribe(data => { console.log(data)
                            this.currentUser = data; },
                            error => console.log(error));

                this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
          //console.log(this.user);

          // here we receive a payload from the token and assigns it to our `user` variable
        }
      });
  }

  ngOnInit() {


    this.currentTheme = this.themeService.currentTheme;

    /* this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: any) => this.user = user); */

      this.userService.onUserChange()
      .subscribe((user: any) => {this.user = user;
                             console.log(this.user);
                            });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.menuService.onItemClick().subscribe(( event ) => {
        this.onItemSelection(event.item.title);
      })
  }
  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      this.logOut();
    } else if ( title === 'Profile' ) {
      this.goToUser();
    }
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
    this.router.navigate(['/pages/dashboard']);
  }

  goToUser() {
    this.router.navigate(['pages/profile']);
  }
  logOut() {
    //console.log("Subuser",this.user.sub)
    this.authService.logout('email')
    this.router.navigate(['/auth/logout']);
 }

  onMenuClick($event) {
    console.log('$even======>',$event);
    }
}
