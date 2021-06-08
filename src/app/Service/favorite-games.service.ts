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
  favoriteGameData:any;

  constructor(private http: HttpClient) { }

  getFavoriteGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL+'GetFavGames/1021').pipe(catchError(this.error))
  }

  setFavoriteGames(){
    this.getFavoriteGames().subscribe(
      data=>{
        this.favoriteGameData = data ;
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
