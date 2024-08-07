// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import io from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebSocketService {
//   private socket = io('http://localhost:5000'); // WebSocket URL
//   public message$ = new BehaviorSubject<any>(null);

//   constructor() {
//     this.socket.on('connect', () => {
//       console.log('WebSocket connected');
//     });

//     this.socket.on('disconnect', () => {
//       console.log('WebSocket disconnected');
//     });

//     this.socket.on('error', (error) => {
//       console.error('WebSocket error:', error);
//     });

//     // 监听 WebSocket 消息
//     this.socket.on('response', (message: any) => {
//       console.log('Received message:', message);
//       this.message$.next(message);
//     });
//   }

//   sendCommand(command: string, args: any) {
//     console.log('Sending command:', { command, args });
//     this.socket.emit('command', { command, args });
//   }
// }
//-----------------------------------
//-----------------------------------
//-----------------------------------
//-----------------------------------
//-----------------------------------


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket = io('http://172.16.68.10:5001'); // WebSocket URL
  public message$ = new BehaviorSubject<any>(null);

  constructor() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected!');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });

    // Listen for WebSocket messages
    this.socket.on('response', (message: any) => {
      console.log('Received message in WebSocketService:', message);
      if (message) {
        this.message$.next(message);
      } else {
        console.warn('Received null or undefined message');
      }
    });
    setTimeout(() => {
      this.message$.next({ type: 'onConnect', a_id: "None number", b_ip: "None number" });
    }, 1000);
  }

  sendCommand(command: string, args: any) {
    console.log('Sending command:', { command, args});
    this.socket.emit('command', { command, args});
  }
}

