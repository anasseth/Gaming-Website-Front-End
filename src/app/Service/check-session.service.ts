import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {

  tokenInfo: any;
  headers = new HttpHeaders();
  searchGamesData: any;
  userData: any;

  constructor(private http: HttpClient) {
    let tokenSign: any = localStorage.getItem('tokenSign');
    this.tokenInfo = JSON.parse(tokenSign)
  }

  checkSession(sessionID: any): Observable<any> {
    let headers = this.headers
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('token', `${this.tokenInfo.token}`)
      .set('signature', `${this.tokenInfo.signature}`)

    console.log(sessionID)
    console.log(headers)

    return this.http.get<any>('https://gapi.spiel90.com/casino/checksession/' + this.tokenInfo.sessionID, { headers }).pipe(catchError(this.error))
  }

  setUserData() {
    this.checkSession(0).subscribe(
      data => {
        this.userData = data
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
