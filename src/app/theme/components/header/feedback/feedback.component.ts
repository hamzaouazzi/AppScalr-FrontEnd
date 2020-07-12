import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../core/mock/users.service';
import { Feedback } from '../../../../core/model/feedback.model';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'ng-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popover;

  submitted = false;
  feedback:Feedback;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.feedback = new Feedback();
  }

  sendFeedback() {
    this.userService.postFeeedbak(this.feedback)
         .subscribe(data => { console.log("New feedback::",data)
                              },
                             error => console.log(error));
                             this.feedback = new Feedback();
  }

  onSubmit() {
    this.submitted = true;
    this.sendFeedback();
   // this.close();
  }

  close() {
    this.popover.hide();
  }



}
