import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,) { }

  baseUrl:string="http://localhost:3000/api";
  private userId: string="";

  createUser(username: string, mode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, mode });
  }
  loginUser(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username },{ withCredentials: true });
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

}
