import { Component, OnDestroy , TemplateRef, ViewChild} from '@angular/core';
import { NbThemeService, NbDialogService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private themeService: NbThemeService, private router: Router,
     private dialogService: NbDialogService, private windowService: NbWindowService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }
  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }
  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  openWithoutBackdrop(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        hasBackdrop: false,
      });
  }

  openWithoutBackdropClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnBackdropClick: false,
      });
  }

  openWithoutEscClose(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnEsc: false,
      });
  }
  navigate() {
    // do your any operations
    this.router.navigate(['path']);
    // also you can pass like this,
     //  this.router.navigateByURL(['path']);
    }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
