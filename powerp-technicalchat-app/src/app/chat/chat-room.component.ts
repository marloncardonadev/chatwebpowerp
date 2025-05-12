import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatHubService } from '../core/services/chat-hub.service';
import { AppState } from '../store/app.state';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MessageService} from '../core/services/chat.service'

@Component({
  selector: 'app-chat-room',
  templateUrl: 'chat-room.component.html',
  styleUrls: ['chat-room.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatIconModule
  ]
})
export class ChatRoomComponent implements OnInit {
  message: string = '';
  messages: any[] = [];
  currentUser: any;

  constructor(
    private chatService: ChatHubService,
    private messageService: MessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(state => state.auth.user).subscribe(user => {
      if (user) {
        this.currentUser = user;

        this.messageService.getMessages().subscribe(historial => {
          this.messages = historial;

          this.chatService.startConnection();

          this.chatService.message$.subscribe(message => {
            this.messages.push(message);
          });
        });
      }
    });
  }

  sendMessage() {
    if (this.message.trim() && this.currentUser?.nickname) {
      this.chatService.sendMessage(this.currentUser.nickname, this.message);
      this.message = '';
    }
  }
}
