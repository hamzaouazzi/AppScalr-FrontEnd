import { Component, OnInit, ElementRef } from '@angular/core';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { PreviewComponent } from '../../studio/subheader/preview/preview.component';
import { StudioService } from '../services/studio.service';

@Component({
  selector: 'ng-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
})
export class SubheaderComponent implements OnInit {
  element:ElementRef=null;

  constructor( private dialogService: NbDialogService, private windowService: NbWindowService,private studioService:StudioService) { }


  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {

  }
  ngOnInit() {
   /*  this.studioService.domSavedNotify().subscribe(dom=> {
      this.element = dom;
      console.log('dommmmmmmmmmmm subheader', this.element);
      this.studioService.notifyOfDomSaved(this.element);
    }, error => {
      console.error('error getting dom saved')
    }) */
  }

  openEdit() {
    this.open(false);
  }

  protected open(closeOnBackdropClick: boolean) {
    this.dialogService.open(PreviewComponent, { closeOnBackdropClick });
  }
}
