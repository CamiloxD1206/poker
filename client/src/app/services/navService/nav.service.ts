import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http: HttpClient) { }
  baseUrl:string="http://localhost:3000/api"

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/room`)
  }
}
