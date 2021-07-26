import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GamesProviderService } from './games-provider.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  gamesData: any = [];
  filterGamesData: any[] = [];
  searchGamesData: any[] = [];
  keyword: string = '';
  activeGames:string="Main"

  constructor(private http: HttpClient) { }

  getGames(providerID:any): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'GetGames/'+providerID).pipe(catchError(this.error))
  }
  SearchGames(keyword:string): Observable<any> {
    return this.http.get<any>(environment.apiBaseURL + 'SearchGames/'+keyword).pipe(catchError(this.error))
  }

  setGames() {
    if (this.gamesData.length == 0 || this.gamesData.length < 0) {
      this.getGames(0).subscribe(
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
  setSearchGames(keyword:string) {
    // if (this.searchGamesData.length == 0 || this.searchGamesData.length < 0) {
      this.SearchGames(keyword).subscribe(
        data => {
          this.searchGamesData = data;
          this.filterGamesData = data
          console.log(data)
        },
        err => {
          console.log(err);
        }
      )
    // }
  }

  GetGamesByCatgory(Name: string) {
    this.filterGamesData = [];
    for (var i = 0; i < this.gamesData.length; i++) {
      if (Name == this.gamesData[i].CatergoryName) {
        this.filterGamesData.push(this.gamesData[i])
      }
    }
  }

  GetGamesByProvider(Name: string,id:number) {
    this.filterGamesData = [];
    this.getGames(id).subscribe(
      data => {
        this.gamesData = data;
        this.filterGamesData = data;
        console.log(data)
      },
      err => {
        console.log(err);
      }
    )
    // for (var i = 0; i < this.gamesData.length; i++) {
    //   if (Name == this.gamesData[i].ProviderName) {
    //     this.filterGamesData.push(this.gamesData[i])
    //   }
    // }

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
