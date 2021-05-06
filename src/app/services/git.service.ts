import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GitProfile } from '../models/git-profile';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(
    private xhr: HttpClient
  ) { }

  getProfile(): Observable<GitProfile> {
    return this.xhr.get<GitProfile>('https://api.github.com/users/gmaxn').pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
