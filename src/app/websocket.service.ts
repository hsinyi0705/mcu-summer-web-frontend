import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket = io('http://localhost:5000'); // 根据你的实际 WebSocket URL 修改
  public message$ = new BehaviorSubject<any>(null);

  constructor() {
    // 监听 WebSocket 消息
    this.socket.on('response', (message: any) => {
      this.message$.next(message);
    });
  }

  sendCommand(command: string, args: string) {
    this.socket.emit('command', { command, args });
  }
}
