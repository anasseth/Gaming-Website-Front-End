import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesProviderService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  gameProvidersData:any;

  constructor(private http: HttpClient) { }

  getGameProviders(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL+'GetGameProviders').pipe(catchError(this.error))
  }

  setGameProviders(){
    this.getGameProviders().subscribe(
      data=>{
        this.gameProvidersData = data ;
      },
      err=>{
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
