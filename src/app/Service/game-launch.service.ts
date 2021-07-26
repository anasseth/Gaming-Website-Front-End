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
  showPopup: boolean = false;
  launchGameURL: string = "";
  tokenInfo: any;

  constructor(private http: HttpClient) {
    let tokenSign: any = localStorage.getItem('tokenSign');
    this.tokenInfo = JSON.parse(tokenSign)
  }

  launchGame(i: any, device: string): Observable<any> {

    let headers = this.headers
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('token', `${this.tokenInfo.token}`)
      .set('signature', `${this.tokenInfo.signature}`)

    console.log("Game ID : " + i.GameId)

    this.launchGameURL = environment.apiBaseURL + 'GameLaunch/' + this.tokenInfo.sessionID + '/' + i.ProviderId + '/' + i.Aggregator + '/' + device + '/' + 'en' + '/' + i.GameId
    console.log(this.launchGameURL)

    return this.http.get<any>(environment.apiBaseURL + 'GameLaunch/' + this.tokenInfo.sessionID + '/' + i.ProviderId + '/' + i.Aggregator + '/' + device + '/' + 'en' + '/' + i.GameId, { 'headers': headers }).pipe(catchError(this.error))
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