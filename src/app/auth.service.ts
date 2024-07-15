import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


// Interface for the login request payload
interface LoginPayload {
  username: string;
  password: string;
}

// Interface for the API response from FakeStore API
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private readonly AUTH_KEY = 'isLoggedIn';
  private readonly TOKEN_KEY = 'eyJhbGciOiJIUzI1NiIsInR';

  // showSibling = new Subject<any>();

  constructor(private http: HttpClient) { 
    this.isLogedin = localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  private isLogedin = false;

  login(username: string, password: string): Observable<boolean> {
    const payload: LoginPayload = { username, password };
    return this.http.post<LoginResponse>(this.apiUrl, payload)
      .pipe(
        map(response => {
          // Check if login was successful 
          if (response.token) {
            // Store token in localStorage
            localStorage.setItem('token', response.token);
           this.isLoggedIn();
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    // Clear token from localStorage 
    localStorage.removeItem('token');
    this.isLogedin = false;
    localStorage.removeItem(this.AUTH_KEY);
    this.removeToken();
  }

  isLoggedIn(): boolean {
    // Check if token exists in localStorage
    this.isLogedin = true;
    localStorage.setItem(this.AUTH_KEY, 'true');
    return !!localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // Check if user is authenticated
    return this.isLogedin;
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
