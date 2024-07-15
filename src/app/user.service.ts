

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  // create a new user
  signUpUser(userDetails: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userDetails);
  }

  // get all users (for checking existence)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  userExists(username: string, email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((users: User[]) => {
        return users.some(user => user.username === username || user.email === email);
      })
    );
  }
}
