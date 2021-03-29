import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldValidators } from '../common/validators/form-field-validators';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

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
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get phone() {
    return this.form.get('phone');
  }
  get email() {
    return this.form.get('email');
  } 
  
  user:any = {}; 
  addIcon = faUserPlus;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  //Function to save user details 
  save(user: any) {
    this.userService.create(user)
    .subscribe();
    this.notificationService.success("Added successfully.");
    this.router.navigate(['/users']);
  }

}
