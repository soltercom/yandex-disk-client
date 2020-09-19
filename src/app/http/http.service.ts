import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../user/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUserByPin(pin: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/pin/${pin}`);
  }

  transformError(error: HttpErrorResponse | string): Observable<never> {
    let errorMessage = 'An unknown error has occurred';
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error! ${error.error.message}`;
    } else if (error.status) {
      errorMessage =
        `Request failed with ${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return throwError(errorMessage);
  }
}
