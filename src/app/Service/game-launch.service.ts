import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaunchGameService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  gameProvidersData: any;
  launchGameURL: string = "www.google.com";
  tokenInfo: any;

  constructor(private http: HttpClient) {
    let tokenSign: any = localStorage.getItem('tokenSign');
    this.tokenInfo = JSON.parse(tokenSign)
  }

  launchGame(i: any): Observable<any> {

    let headers = this.headers
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('token', `${this.tokenInfo.token}`)
      .set('signature', `${this.tokenInfo.signature}`)

    this.launchGameURL = environment.apiBaseURL + 'GameLaunch/' + this.tokenInfo.sessionID + '/' + i.ProviderId + '/' + i.Aggregator + '/' + 'desktop' + '/' + 'en' + '/' + i.ProductId
    console.log(this.launchGameURL)

    return this.http.get<any>(environment.apiBaseURL + 'GameLaunch/' + this.tokenInfo.sessionID + '/' + i.ProviderId + '/' + i.Aggregator + '/' + 'desktop' + '/' + 'en' + '/' + i.ProductId, { 'headers': headers }).pipe(catchError(this.error))
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