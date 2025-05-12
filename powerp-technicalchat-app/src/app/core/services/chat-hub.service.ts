import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Subject, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatHubService {
  private hubConnection: HubConnection | null = null;
  private messageSubject = new Subject<any>();
  public message$ = this.messageSubject.asObservable();

  constructor(private store: Store<AppState>) {}

  // Crear la conexión con el Hub
  async startConnection() {
    try {
        this.hubConnection = new HubConnectionBuilder()
          .withUrl('https://chatapipowerp-bba2f0daewfqdxfd.westus2-01.azurewebsites.net/chathub', {
            accessTokenFactory: () => String('4rAU6lQbxv9GB7rVjkS47A7AIRQI0IVpiN6mcnsHnkFVQWNK9hrGJQQJ99BEAC8vTInXJ3w3AAAAASRSBGyR')
          })
          .configureLogging(LogLevel.Information)
          .build();
    
        await this.hubConnection.start();
        console.log('Conexión a SignalR establecida');
    
        this.hubConnection.on('ReceiveMessage', (message: any) => {
          this.messageSubject.next(message);
        });
    
      } catch (err) {
        console.error('Error al conectar con SignalR', err);
      }
  }

  // Enviar mensaje al hub
  sendMessage(apodo: string, mensaje: string) {
    this.hubConnection?.invoke('SendMessage', apodo, mensaje)
      .catch(err => console.error('Error al enviar mensaje', err));
  }
}