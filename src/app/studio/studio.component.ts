import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";
import { NbAuthService } from "./../auth/services/auth.service";
import { NbAuthJWTToken } from "./../auth/services/token/token";
import { UserData } from "./../core/data/users";
import { LayoutService } from "./../core/utils";
import { map, takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { UserService } from "./../core/mock/users.service";
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { UiCategory } from "./models/UiCategory.model";
import { UiElementsService } from './services/UiElements.service';
import { UiElement } from './models/UiElement.model';
import { StudioService } from './services/studio.service';

@Component({
  selector: "ngx-designer",
  templateUrl: "./studio.component.html",
  styleUrls: ["./studio.component.scss"]
})
export class StudioComponent implements OnInit, OnDestroy {
  categories: UiCategory[];
  @ViewChild("item", { static: true }) accordion;

  constructor(
    private authService: NbAuthService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private uiElementsService: UiElementsService,
    private studioService: StudioService
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload();
        console.log(this.user);

        // here we receive a payload from the token and assigns it to our `user` variable
      }
    });
  }

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: String =
    "https://img.icons8.com/dusk/64/000000/user-male-circle--v1.png";
  user: any;

  elementDropped = true;

  themes = [
    {
      value: "default",
      name: "Light"
    },
    {
      value: "dark",
      name: "Dark"
    }
  ];

  currentTheme = "default";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  defaultAnswersOrigin = [
    { isInput: true, placeholderText: "Enter Placeholder" },
    { isTextarea: true, secondaryPlaceholderText: "Enter Text Placeholder" },
    { isButton: true, placeholderText: "", displayValue: "" }
  ];

  defaultAnswers = [];

  answers = [];

  ngOnInit() {

    this.uiElementsService.__fetchAllUiElements().pipe(tap(res=>console.log('data returned from server'))).subscribe(uiCategories =>{
      this.categories = uiCategories;
    }, error=>{
      console.error('error exists', error)
    });




    this.currentTheme = this.themeService.currentTheme;
    this.resetList();

    this.userService.onUserChange().subscribe((user: any) => {
      this.user = user;
      console.log(this.user);
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange().pipe(
      map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
      takeUntil(this.destroy$)
    );
    // .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
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

  dropDetected = false;
  droppedElement: UiElement;

  dropIt(event: CdkDragDrop<string[]>) {
    console.log("Hit");
    this.dropDetected = true;



    //UiElement current element to be dropped


    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const answerCopy = this.createCopy(this.answers[event.currentIndex]);
      this.answers[event.currentIndex] = answerCopy;
      console.log(answerCopy);
      this.answers.forEach((answer, i) => {
        answer.position = i;
      });
      this.resetList();
    } else if (event.previousIndex !== event.currentIndex) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
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

  /*   *********   *********   *********   *********   *********   *********   *********   *********   *********
   *********   *********   ****************** DRAG AND DROP MANIPULATION ***********
   *********   *********   *********   *********   *********   *********   *********   *********   **********/

  dragged() {
    console.log("component being dragged");
  }





  elementsCurrentlyInShell: UiElement[];


  

  handleDraggedElement($event: UiElement){
    const element = $event;
    console.log('user dragged this element', element);
    this.studioService.uiNotifier$()
  }
}
