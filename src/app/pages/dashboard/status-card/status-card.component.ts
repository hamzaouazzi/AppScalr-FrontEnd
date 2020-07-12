import { Component, Input, OnInit, AfterViewInit, AfterContentInit,NgZone, ChangeDetectorRef } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { UserService } from '../../../core/mock/users.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  templateUrl: './status-card.component.html',
})
export class StatusCardComponent implements OnInit,AfterViewInit,AfterContentInit {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  flipped = false;

  stats:any;

  constructor(private userService:UserService,private zone:NgZone,private cd:ChangeDetectorRef) {


  }
  ngAfterContentInit() {
    //this.userService.getUserStats();
  }
  ngAfterViewInit() {
    //this.userService.getUserStats();
    //this.reloadData();
  }

  ngOnInit() {
    this.reloadData();
    const timer = Observable.timer(2000, 5000);
    timer.subscribe(() => this.reloadData());

  }
  reloadData() {
   //this.stats = this.userService.getUserStats();
   //console.log("Status",this.stats)

   this.userService.getUserStats()
                          .subscribe(data => {
                            this.stats = data;
                            this.cd.detectChanges()
                            //console.log("stats::",this.stats)
                          });
  }

  toggleView() {
    this.flipped = !this.flipped;
  }
}
