import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../core/model/Project.model';
import { ProjectsComponent } from '../projects.component';
import { Template } from '../../../../core/model/template.model';
import { DashboardService } from '../../../../core/mock/dashboard.service';
import { Router } from '@angular/router';
import { App } from '../../../../core/model/app.model';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() title: string;
  @ViewChild("formone", { static: false }) formone;
  @ViewChild("formtwo", { static: false }) formtwo;
  @ViewChild("formthree", { static: false }) formthree;
  @ViewChild("formfour", { static: false }) formfour;

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  lastForm: FormGroup;

  app:App=new App();
  templates:Template[];
  submitted = false;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>,
               private fb: FormBuilder,
               private service:DashboardService,
               private router:Router) {}

  ngOnInit() {

    this.reloadData();
    this.firstForm = this.fb.group({
      app_name: ['', Validators.required],
      app_desc: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      templateid: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      app_icon_url: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    console.log(this.formone.value);
    //this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    console.log(this.formtwo.value);
    //this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    console.log(this.formthree.value);
    //this.thirdForm.markAsDirty();
  }

  create() {
    this.service.createApp(this.app)
         .subscribe(data => { console.log("New app::",data)
                              },
                             error => console.log(error));
                             this.app=new App();
    // this.router.navigate(['pages/dashboard']);

  }

  onSubmit() {
    //this.submitted = true;
    this.create();
    this.gotoList();
  }
  gotoList() {
    this.router.navigate(['pages/dashboard']);
    this.ref.close();
  }

  reloadData() {
    this.service.getTemplates()
         .subscribe(data => { console.log("Templates::",data)
                             this.templates = data; },
                             error => console.log(error));
   }


  dismiss() {
    this.ref.close();
  }
}
