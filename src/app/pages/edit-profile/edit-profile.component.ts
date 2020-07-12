import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NbUser } from '../../auth/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/mock/users.service';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  id:number;
  user:NbUser;
  specilaty=
  [
    { "value":"Student" },
    { "value":"Developer"},
    {  "value":"Tester" }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userservice:UserService) {
               /*  this.userservice.currentUser()
                .subscribe(data => { console.log(data)
                                    this.user = data; },
                                    error => console.log(error)); */
               }


  ngOnInit() {
    this.user = new NbUser();
   // this.id=this.route.snapshot.params['id'];
    this.userservice.currentUser().subscribe(data=> {
      console.log(data);
      this.user=data;
    }, error => console.log(error));

  }

  updateUser() {
    this.userservice.updateUser(this.user).subscribe(
      data=> {
        this.user =data;
        console.log(data);
        this.userservice.getUserStats();
      },
      error => console.log(error));
    this.router.navigateByUrl('pages/dashboard');
    this.user = new NbUser();

  }

  onSubmit() {
      this.updateUser();

  }

  back(){
    this.router.navigateByUrl('pages/dashboard');
  }

}
