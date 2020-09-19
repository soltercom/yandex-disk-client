import { Injectable } from '@angular/core';
import { Role } from './auth.enum';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IUser, User } from '../user/user';
import { HttpService } from '../http/http.service';
import { catchError, filter, map, tap } from 'rxjs/operators';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  user: IUser;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.NONE,
  user: null,
};

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;

  login(pin: string): Observable<IAuthStatus>;
  logout(clearToken?: boolean): void;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(new User());

  constructor(private httpService: HttpService) {}

  login(pin: string): Observable<IAuthStatus> {
    const loginResponse$ = this.httpService.getUserByPin(pin).pipe(
      filter((user: IUser) => user != null),
      map((user: IUser) => {
        return {
          isAuthenticated: user != null,
          user: User.Build(user),
          userRole: Role.STAFF
        };
      }),
      tap((status: IAuthStatus) => this.authStatus$.next(status)),
      tap((status: IAuthStatus) => this.currentUser$.next(status.user)),
      catchError(this.httpService.transformError)
    );

    loginResponse$.subscribe({
      error: err => {
        this.logout();
        return throwError(err);
      },
    });

    return loginResponse$;
  }

  logout(): void {
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0);
  }
}
