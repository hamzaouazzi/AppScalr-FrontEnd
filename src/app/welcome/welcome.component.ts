import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'ngx-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    //particlesJS.load('particles-js', '../assets/particles.json', function() {console.log('particles.json loaded...');});
   }



}
