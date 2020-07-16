import { Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { DashboardService } from '../../../core/mock/dashboard.service';
import { Router } from '@angular/router';
import { UserLog } from '../../../core/model/userlog.model';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ngx-changelogs',
  templateUrl: './changelogs.component.html',
  styleUrls: ['./changelogs.component.scss']
})
export class ChangelogsComponent implements OnInit {

  userlogs:UserLog[];

  constructor(private router: Router, private dashboardService: DashboardService,private cd:ChangeDetectorRef) {

             }

  ngOnInit() {
    this.getUserLogs();
    const timer = Observable.timer(2000, 5000);
   timer.subscribe(() => this.getUserLogs());

  }

  getUserLogs() {
    this.dashboardService.getUserLogs()
         .subscribe(data => { console.log("userlogs::",data)
                                this.userlogs = data;
                                this.cd.detectChanges()},
                             error => console.log(error));

   }


}
