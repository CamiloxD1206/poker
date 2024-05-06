import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../services/roomService/room.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() roomId: string = '';
  @Input() isAdmin: boolean = false;

  usersInRoom: { username: string, isAdmin: boolean }[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.roomService.getUsersInRoom(this.roomId).subscribe(
      (users) => {
        this.usersInRoom = users;
      },
      (error) => {
        console.error('Error al obtener usuarios en la sala:', error);
      }
    );
  }
}
