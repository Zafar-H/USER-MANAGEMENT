import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, delay } from 'rxjs/operators';
import { combineLatest, throwError, timer } from 'rxjs';
import { pipe } from 'rxjs-compat';
import { IUser } from '../user';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import 'rxjs-compat/add/observable/timer';

@Injectable({ 
  providedIn: 'root'
})
export class DataService {

  

  constructor(private url:string, private http : HttpClient) { }

  getAll() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(this.url);
    //.pipe(delay(2000));
  }

  getDataCount()
  {
    return this.http.get(this.url+ '/count');
  }

  getDataPerPage(pageSize, pageIndex) : Observable<IUser[]>
  {
    return this.http
      .get<IUser[]>(this.url+ '?pageSize=' +pageSize+ '&pageNo=' +pageIndex);
      //  .pipe(delay(2000));
  }

  getSortedData(pageSize, pageIndex, sortByData, sortByOrder) : Observable<IUser[]>
  {
    return this.http
      .get<IUser[]>(this.url+ '?pageSize=' +pageSize+ '&pageNo=' +pageIndex+ '&sortBy=' +sortByData+ '&sortDir=' +sortByOrder);
  }

  getFilteredData(filterData : string, pageSize, pageIndex): Observable<IUser[]> 
  {
    return this.http
      .get<IUser[]>(this.url+ '/search/' +filterData+ '?pageSize=' +pageSize+ '&pageNo=' +pageIndex);
  }

  create(resource:any) {
    return this.http.post(this.url, resource)
      .pipe(catchError(this.errorHandler));
  }

  getDataById(id: string) {
    return this.http.get<IUser[]>(this.url+ '/' + id);
  }

  update(id: string, resource: IUser[]) {
    return this.http.put(this.url+ '/' + id, resource)
    .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.http.delete(this.url+ '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {  
    if (error.status === 404)   
          return throwError(new NotFoundError()); 
    else if (error.status === 400)
          return throwError( new BadInput(error));
    return throwError(new AppError(error));  
  } 

}
