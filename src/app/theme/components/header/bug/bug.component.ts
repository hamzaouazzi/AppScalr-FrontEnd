import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {
  fileToUpload: File = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

}
