import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  categoriesData: any;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetCategories').pipe(catchError(this.error))
  }

  setCategories(){
    this.getCategories().subscribe(
      data=>{
        this.categoriesData = data ;
      },
      err =>{
        console.log(err)
      }
    )
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
