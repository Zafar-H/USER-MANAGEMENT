import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Output, EventEmitter, Input, ViewChildren } from '@angular/core';
import { UserService } from '../user.service';
import { faArrowDown, faPen, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IUser } from '../user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../services/dialog.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  //Specifying the order of table columns to be displayed...
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'edit', 'delete'];

  //Specifying the number of data to be displayed per page...
  pageSizeOptions = [3, 5, 10, 25, 50];
  pageSize:number = 5;
  pageIndex:number = 0;
  totalData:number;
  isLoading=false;

  sortBy:string;
  sortOrder:string;

  public users: IUser[];
  editIcon = faPen;
  sortIcon = faSort;
  arrowIcon = faArrowDown;
  deleteIcon = faTrash;
  
  subscription : Subscription;
  
  dataNotFound:boolean;
  dataSource;

  constructor(
    private dialogService: DialogService,
    private userService : UserService,
    private notificationService: NotificationService
  ) { }

  //Declaring variables for sorting and pagination features...
  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) matTable : MatTable<any>;
  
  ngOnInit(): void {
    //Showing spinner if data retrieval is delayed
    this.isLoading = true;

    //Getting data from API...
    this.userService.getDataCount()
      .subscribe(data => this.totalData = +(data.toString()));

    this.subscription = this.userService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.isLoading = false;
      });
  }

  ngAfterViewInit(): void {

    this.paginator.page.subscribe(page => {
      this.isLoading = true;
      this.pageSize = page.pageSize;
      this.pageIndex = page.pageIndex;
      this.userService.getDataPerPage(this.pageSize, this.pageIndex)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.isLoading = false;
        });
    });
  }

  sort(query) {
    this.sortBy = query.id;
    this.sortOrder = query._arrowDirection;
    this.subscription = this.userService.getSortedData(this.pageSize, this.pageIndex, this.sortBy, this.sortOrder)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //Method to apply search functionality...
  filter(query: string) {
    this.subscription = this.userService.getFilteredData(query, this.pageSize, this.pageIndex )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        if(this.dataSource.filteredData.length != 0)
          this.dataNotFound = false;
        else
          this.dataNotFound = true;
      });
  }

  //function to delete selected user
  delete(userId) {
    /* if(!confirm('Are you sure, you want to delete?')) return;

    this.userService.delete(userId).subscribe(
      () => {
        this.ngOnInit();
      },
      (error : AppError) => {
        if(error instanceof NotFoundError)
          alert('This data was already deleted!!!');
        else throw error;
      }
    ); */

    this.dialogService.openConfirmDialog('Are you sure, you want to delete?')
    .afterClosed()
      .subscribe(result => {
        if(result) {
          this.userService.delete(userId)
          .subscribe(
            () => {
              this.ngOnInit();
            },
            (error : AppError) => {
              if(error instanceof NotFoundError)
                alert('This data was already deleted!!!');
              else throw error;
          });
          this.notificationService.success("Deleted successfully.")
        }
      });
  }

}


