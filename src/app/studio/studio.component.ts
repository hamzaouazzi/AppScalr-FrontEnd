import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from './../core/mock/users.service';


@Component({
  selector: 'ngx-designer',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnInit, OnDestroy {


  constructor() {


  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }




}
