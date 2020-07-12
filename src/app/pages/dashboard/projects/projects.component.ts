import { Component, OnDestroy , TemplateRef, ViewChild, OnInit, OnChanges, SimpleChanges,NgZone, ChangeDetectorRef} from '@angular/core';
import { NbThemeService, NbDialogService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { DashboardService } from '../../../core/mock/dashboard.service';
import { Project, Page } from '../../../core/model/Project.model';
import { Observable } from 'rxjs/Rx';
import { App } from '../../../core/model/app.model';

@Component({
  selector: 'ngx-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnDestroy,OnInit {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  currentTheme: string;
  themeSubscription: any;
  projects:Array<Project>;
  id:number;
  project:Project;
  pages:Page[];
  idDelete:number;
  nameDelete:string;
  app:App;



  constructor(private themeService: NbThemeService, private router: Router,private zone:NgZone,
              private cd:ChangeDetectorRef,
              private dialogService: NbDialogService,
              private dashboardService: DashboardService) {
                this.projects = new Array<Project>();
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  getProjects() {
    this.dashboardService.getApps()
         .subscribe(data => {
                              //  this.zone.run(() => {
                                this.projects = data;
                                this.cd.detectChanges()
                               // console.log("projects::",this.projects)
                              });

   }

  ngOnInit() {
   this.getProjects();
   const timer = Observable.timer(2000, 5000);
   timer.subscribe(() => this.getProjects());
   this.project = new Project();
   this.app = new App();
  }


  trackByFn(index, project) {
    return project.id;
  }

  openApp(dialog: TemplateRef<any>,idApp:number,nameApp:string) {
    this.id=idApp;
    this.nameDelete=nameApp;
    console.log("App-ID:",idApp)
    this.dashboardService.getApp(this.id)
    .subscribe(data => {
      console.log(data)
      this.project = data;
    }, error => console.log(error));
    this.dashboardService.getAppPages(this.id)
    .subscribe(data => {
      console.log(data)
      this.pages = data;
    }, error => console.log(error));
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  openDelete(dialog2: TemplateRef<any>,idApp:number,nameApp:string) {
    this.idDelete = idApp;
    this.nameDelete = nameApp;
    console.log("Delete-ID:",this.idDelete);
    this.dashboardService.deleteApp(this.idDelete);
    this.dialogService.open(
      dialog2,
      { context: 'this is some additional data passed to dialog2' });
  }

  /* clickDelete(idApp:number) {
    this.idDelete = idApp;
      console.log("Delete-ID:",this.idDelete);
      this.dashboardService.deleteApp(this.idDelete);
      this. getProjects();

  } */

   updateApp() {
     this.app.appname=this.project.app_name;
     this.app.appdesc=this.project.app_desc;
     this.app.appicon=this.project.app_icon_url;
     console.log("This.app=",this.app)
    this.dashboardService.editApp(this.id, this.app)
        .subscribe(data => console.log(data), error => console.log(error));
   // this.dashboardService.getApps();
        this.gotoList();
  }

  deleteApp() {
    console.log("App-ID:",this.idDelete);
    this.dashboardService.deleteApp(this.idDelete)
        .subscribe(data => console.log(data), error => console.log(error));
  }

  onSubmit() {
    this.updateApp();
  }

  gotoList() {
    this.getProjects();
    this.router.navigate(['pages/dashboard']);
  }


  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

   navigate(id:number) {
    //  any operations
    this.router.navigate(['/studio', id]);
    }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
