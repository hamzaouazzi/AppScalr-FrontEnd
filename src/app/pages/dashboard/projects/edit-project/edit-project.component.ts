import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  @Input() title: string;

  constructor(protected ref: NbDialogRef<EditProjectComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }

}
