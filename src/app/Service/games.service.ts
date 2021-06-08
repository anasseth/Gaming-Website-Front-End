import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  gamesData: any = [];
  filterGamesData: any = [];
  searchGamesData: any = [];

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetGames/0').pipe(catchError(this.error))
  }
  SearchGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'SearchGames/fruit').pipe(catchError(this.error))
  }

  setGames() {
    this.getGames().subscribe(
      data => {
        this.gamesData = data;
        this.filterGamesData = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  setSearchGames() {
    this.SearchGames().subscribe(
      data => {
        this.searchGamesData = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  GetGamesByCatgory(Name: string) {
    this.filterGamesData = [];
    for (var i = 0; i < this.gamesData.length; i++) {
      if (Name == this.gamesData[i].CatergoryName) {
        this.filterGamesData.push(this.gamesData[i])
      }
    }
  }
  GetGamesByProvider(Name: string) {
    this.filterGamesData = [];
    for (var i = 0; i < this.gamesData.length; i++) {
      if (Name == this.gamesData[i].ProviderName) {
        this.filterGamesData.push(this.gamesData[i])
      }
    }
  }
  GetSearchGames(Name: string) {
    this.filterGamesData = [];
    for (var i = 0; i < this.searchGamesData.length; i++) {
      if (Name.toLocaleLowerCase() == this.searchGamesData[i].GameText.toLocaleLowerCase()) {
        this.filterGamesData.push(this.searchGamesData[i])
      }
    }
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
