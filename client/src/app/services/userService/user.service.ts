import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/api";
  private userId: string = "";
  private username: string = "";

  createUser(username: string, mode: string): Observable<{ userId: string, username: string }> {
    return this.http.post<{ userId: string, username: string }>(`${this.baseUrl}/register`, { username, mode }).pipe(
      tap((response: { userId: string, username: string }) => {
        this.userId = response.userId;
        this.username = response.username;
      })
    );
  }

  loginUser(username: string): Observable<{ userId: string, username: string }> {
    return this.http.post<{ userId: string, username: string }>(`${this.baseUrl}/login`, { username }, { withCredentials: true }).pipe(
      tap((response: { userId: string, username: string }) => {
        this.userId = response.userId;
        this.username = response.username;
      })
    );
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  getUserId(): string {
    return this.userId;
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUsername(): string {
    return this.username;
  }
  setUsername(username: string): void {
    this.username = username;
  }
}
