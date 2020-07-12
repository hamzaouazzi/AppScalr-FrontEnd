import { Component, OnInit, Input, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from './../core/mock/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-designer',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnInit, OnDestroy {

  id: number;

  constructor(private route: ActivatedRoute,private router: Router) {


  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("ID app studio::",this.id);

  }

  ngOnDestroy() {

  }




}
