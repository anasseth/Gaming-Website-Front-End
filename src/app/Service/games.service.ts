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
  filterGamesData: any[] = [];
  searchGamesData: any[] = [];
  keyword: string = '';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetGames/0').pipe(catchError(this.error))
  }
  SearchGames(): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'SearchGames/fruit').pipe(catchError(this.error))
  }

  setGames() {
    if (this.gamesData.length == 0 || this.gamesData.length < 0) {
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
  }
  setSearchGames() {
    if (this.searchGamesData.length == 0 || this.searchGamesData.length < 0) {
      this.SearchGames().subscribe(
        data => {
          this.searchGamesData = data;
        },
        err => {
          console.log(err);
        }
      )
    }
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
  // GetSearchGames(Name: string) {
  //   this.filterGamesData = [];
  //   for (var i = 0; i < this.searchGamesData.length; i++) {
  //     if (Name.toLocaleLowerCase() == this.searchGamesData[i].GameText.toLocaleLowerCase()) {
  //       this.filterGamesData.push(this.searchGamesData[i])
  //     }
  //   }
  // }

  async updateResults() {
    this.filterGamesData = this.GetSearchGames(this.searchGamesData);
  }

  GetSearchGames(items: any) {
    return items.filter((i: { GameText: string; }) => {
      if (this.keyword.trim() === '') {
        return true;
      } else {
        return i.GameText.toLowerCase().includes(this.keyword.trim().toLocaleLowerCase());
      }
    })
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
