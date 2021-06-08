import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  sliderData: any;
  constructor(private http: HttpClient) { }

  getSliders(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetSliders').pipe(catchError(this.error))
  }

  setSlider() {
    this.getSliders().subscribe(
      data => {
        this.sliderData = data;
      },
      err => {
        console.log(err);
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
