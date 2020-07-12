import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DashboardService } from '../../../core/mock/dashboard.service';
import { Router } from '@angular/router';
import { UserLog } from '../../../core/model/userlog.model';

@Component({
  selector: 'ngx-changelogs',
  templateUrl: './changelogs.component.html',
  styleUrls: ['./changelogs.component.scss']
})
export class ChangelogsComponent implements OnInit {

  userlogs:UserLog[];

  constructor(private router: Router, private dashboardService: DashboardService) {

             }

  ngOnInit() {
    this.getUserLogs();

  }

  getUserLogs() {
    this.dashboardService.getUserLogs()
         .subscribe(data => { console.log("userlogs::",data)
                                this.userlogs = data; },
                             error => console.log(error));

   }


}
