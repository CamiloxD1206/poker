import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:3000/api';
  private socket: Socket;
  newUserJoined = new EventEmitter<string[]>();

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  createRoom(roomname: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/roomct`, { roomname }, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  joinRoom(roomId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/join/${roomId}`, {}, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }


  getUsersInRoom(roomId: string): Observable<{ username: string, isAdmin: boolean }[]> {
    return this.http.get<{ username: string, mode: string, isAdmin: boolean }[]>(`${this.baseUrl}/room/${roomId}/users`)
      .pipe(
        catchError(this.handleError),
        map((response) => {
          if (Array.isArray(response)) {
            return response.map(user => ({
              username: user.username,
              isAdmin: user.mode === 'jugador' && user.isAdmin === true
            }));
          } else {
            throw new Error('No se encontraron usuarios en la sala');
          }
        })
      );
  }


  getRoomNameById(roomId: string): Observable<string> {
    return this.http.get<{ roomname: string }>(`${this.baseUrl}/room/${roomId}/name`)
      .pipe(
        catchError(this.handleError),
        map(response => response.roomname)
      );
  }

  ///-----------------------------------------


  joinRoomWebSocket(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
    this.socket.on('userJoined', (users: string[]) => {
      this.newUserJoined.emit(users);
    });
  }

  deleteUserFromRoom(roomId: string, userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/room/${roomId}/users/delete`, {
      withCredentials: true,
      body: { userId }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(`Código de error ${error.status}, ` + `body: ${error.error}`);
    }
    return throwError('Error en el servidor al realizar la solicitud');
  }
  //----------------------------

  notifyOverlayValidation(valid: boolean): void {
    this.socket.emit('overlayValidated', valid);
  }
  getSocket(): Socket {
    return this.socket;
  }
}
