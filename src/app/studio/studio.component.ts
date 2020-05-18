import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthService } from './../auth/services/auth.service';
import {NbAuthJWTToken} from './../auth/services/token/token';
import { UserData } from './../core/data/users';
import { LayoutService } from './../core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from './../core/mock/users.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'ngx-designer',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnInit, OnDestroy {

  @ViewChild('item', { static: true }) accordion;


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


defaultAnswersOrigin = [
  {isInput: true, placeholderText: "Enter Placeholder"},
  {isTextarea: true, secondaryPlaceholderText: "Enter Text Placeholder"},
  {isButton: true, placeholderText: "", displayValue: ""},

];

defaultAnswers = [];

answers = [];

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
    this.resetList();

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

  createCopy(origin) {
    return JSON.parse(JSON.stringify(origin));
  }

  dropIt(event: CdkDragDrop<string[]>) {
    console.log('Hit');
      if (event.previousContainer !== event.container) {
           transferArrayItem(event.previousContainer.data,
                               event.container.data,
                               event.previousIndex,
                               event.currentIndex);
              const answerCopy = this.createCopy(this.answers[event.currentIndex]);
              this.answers[event.currentIndex] = answerCopy;
              console.log(answerCopy);
              this.answers.forEach((answer, i) => {
                  answer.position = i;
              });
          this.resetList();
      } else if (event.previousIndex !== event.currentIndex) {
          if (event.previousContainer === event.container) {
              moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
              // this.resetList();
          }
      }
    }

   resetList() {
      this.defaultAnswers = [];
      setTimeout(() => {
        this.defaultAnswers = this.defaultAnswersOrigin.slice();
      }, 0);
    }


}
