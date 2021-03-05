import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:any = {};
  id:any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.userService.getUserById(this.id)
        .subscribe(p => {
          this.user = p;
        });     
  }

  ngOnInit(): void {
  }

  update(course: any) {

    this.userService.updateUser(this.id, this.user);
    this.router.navigate(['/users']);
  }

}
