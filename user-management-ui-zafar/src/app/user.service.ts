import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string= "http://localhost:8080/users";

  constructor(private http : HttpClient) { }

  getUsers() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(this.url);
  }

  createUser(user:any) {
    this.http.post(this.url, user)
      .subscribe();
  }

  getUserById(userId: string) {
    return this.http.get<IUser[]>(this.url+ '/' + userId);
  }

  updateUser(userId: string, user: any) {
    this.http.put(this.url+ '/' + userId, user)
    .subscribe();
  }

  deleteUser(userId: string, user: any) {
    this.http.delete(this.url+ '/' +userId, user)
      .subscribe();
  }
}
