import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user:any = {};

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  save(user: any) {
    this.userService.createUser(user);
    this.router.navigate(['/users']);
  }

}
