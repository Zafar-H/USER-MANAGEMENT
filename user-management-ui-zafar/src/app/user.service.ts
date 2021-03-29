import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({ 
  providedIn: 'root'
})
export class UserService extends DataService{

  //private url:string= "http://localhost:8080/users";

  constructor(http : HttpClient) {
    super("http://localhost:8080/users", http);
   }

   form = new FormGroup({
    $key : new FormControl(null),
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    phone : new FormControl(''),
    email : new FormControl('')
  });
  

}