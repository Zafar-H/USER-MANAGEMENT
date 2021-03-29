import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../user.service';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldValidators } from '../common/validators/form-field-validators';
import { IUser } from '../user';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form = new FormGroup({
    //validations for first name field
    firstName : new FormControl('', [
      Validators.required,
      FormFieldValidators.shouldBeAlphabet
    ]),
    //validations for last name field
    lastName : new FormControl('', [
      Validators.required,
      FormFieldValidators.shouldBeAlphabet
    ]),
    //validations for phone field
    phone : new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      FormFieldValidators.shouldBeNumber,
      FormFieldValidators.cannotContainSpace
    ]),
    //validations for email field
    email : new FormControl('', [
      Validators.required,
      FormFieldValidators.ShouldBeMailFormat
    ])
  });

  //Specifying getters for form fields
  get firstName() {
    return this.form.get('firstName');;
  }
  get lastName() {
    return this.form.get('lastName');;
  }
  get phone() {
    return this.form.get('phone');;
  }
  get email() {
    return this.form.get('email');;
  }

  user:any = {};
  id:string;
  editIcon = faPencilAlt;
  deleteIcon = faTrash;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.userService.getDataById(this.id)
        .subscribe(p => {
          this.user = p;
        });     
  }

  ngOnInit(): void {
  }

  //Function to update selected user details
  update(user: IUser[]) {
    this.userService.update(this.user.id, this.user)
    .subscribe();
    this.notificationService.success("Updated successfully.");
    this.router.navigate(['/users']);
  }



  

}
