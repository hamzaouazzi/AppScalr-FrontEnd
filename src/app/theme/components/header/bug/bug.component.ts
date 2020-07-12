import { Component, OnInit, ViewChild } from '@angular/core';
import { Bug } from '../../../../core/model/bug.model';
import { UserService } from '../../../../core/mock/users.service';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'ng-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popover;

  fileToUpload: File = null;
  bug:Bug;
  submitted = false;

  Types =["Urgent","Super-Urgent","Suggested"];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.bug = new Bug();
  }

  declareBug() {
    this.userService.declareBug(this.bug)
         .subscribe(data => { console.log("New Bug::",data)
                              },
                             error => console.log(error));
                             this.bug = new Bug();
  }

  onSubmit() {
    this.submitted = true;
    this.declareBug();

   // this.close();
  }

  close() {
    this.popover.hide();
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

}
