import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteGamesService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  favoriteGameData: any;
  tokenInfo: any;

  constructor(private http: HttpClient) {
    let tokenSign: any = localStorage.getItem('tokenSign');
    this.tokenInfo = JSON.parse(tokenSign)
  }

  getFavoriteGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetFavGames/1021').pipe(catchError(this.error))
  }

  setFavoriteGames() {
    this.getFavoriteGames().subscribe(
      data => {
        this.favoriteGameData = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  addFavoriteGames(selectedGame: any) {
    let headers = this.headers
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('token', `${this.tokenInfo.token}`)
      .set('signature', `${this.tokenInfo.signature}`)

    return this.http.post<any>(environment.apiBaseURL + 'AddFavGame/' + this.tokenInfo.sessionID + '/1', selectedGame, { 'headers': headers }).pipe(catchError(this.error))
  }

  removeFavoriteGame(selectedGame: any) {
    let headers = this.headers
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('token', `${this.tokenInfo.token}`)
      .set('signature', `${this.tokenInfo.signature}`)

    return this.http.post<any>(environment.apiBaseURL + 'RemoveFavGame/' + this.tokenInfo.sessionID+ '/1', selectedGame, { 'headers': headers }).pipe(catchError(this.error))
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
