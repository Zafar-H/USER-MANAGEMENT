import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IUser } from '../user';
import { Sort, MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  //Specifying the number of data to be displayed per page...
  pageSizeOptions = [5, 10, 25, 50];
  initialPageLength: number = 5;

  //Specifying the order of table columns to be displayed...
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'edit'];

  public users: IUser[];
  editIcon = faPen;
  isDataAvailable: boolean = false;
  filteredUsers : IUser[];
  subscription : Subscription;
  sortedUser: IUser[];
  totalData:number;
  dataNotFound:boolean;
  dataSource;
  dataSourceLength: number;

  //Declaring variables for sorting and pagination features...
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private router: Router,
    private userService : UserService
  ) { }

  
  ngOnInit(): void {
    //Getting data from API...
    this.subscription = this.userService.getUsers()
      .subscribe(data => {
        this.filteredUsers = this.users = data;
        this.isDataAvailable = true;
        this.sortedUser = data.slice();
        this.totalData = data.length;
        this.dataSource = new MatTableDataSource(data);
        this.dataSourceLength = this.dataSource.length;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //Method to apply search functionality...
  filter(query: string) {
    this.dataSource.filter = query.trim().toLocaleLowerCase();
    console.log(this.dataSource.filteredData.length);
    if(this.dataSource.filteredData.length != 0) {
      this.dataNotFound = false;
    }
    else
      this.dataNotFound = true;
  }

  


  


}
