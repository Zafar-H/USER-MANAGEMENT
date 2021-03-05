import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any;

  constructor(
    private router: Router,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(data=> {
        this.users= data;
      });
  }

  delete(user: any) {
    if(confirm('Are you sure, yuo want to delete?')) {
      this.userService.deleteUser(user.id, user);
      this.router.navigate['/users'];
      window.location.reload();
    }
  }

}
