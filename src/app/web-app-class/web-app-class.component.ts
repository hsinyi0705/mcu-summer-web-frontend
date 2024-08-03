import { CommonModule, NgFor } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-web-app-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './web-app-class.component.html',
  styleUrls: ['./web-app-class.component.css'],
})
export class WebAppClassComponent {
  form = new FormGroup({
    id: new FormControl(''),
    ip: new FormControl(''),
    addLocation: new FormControl(''),
    goToLocation: new FormControl(''),
    deleteLocation: new FormControl(''),
    speak: new FormControl(''),
  });

  selectedFunc: string = '';
  locations: string[] = []; // 新增一个数组用于存储地点

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.message$.subscribe((message) => {
      console.log('Received message:', message);
      if (message.command === 'addLocation' && message.status === 'added') {
        this.locations.push(message.location); // 将新增的地点添加到数组中
      } else if (message.command === 'deleteLocation' && message.status === 'deleted') {
        this.locations = this.locations.filter((loc) => loc !== message.location); // 从数组中删除地点
      }
    });
  }

  selectFunc(functionType: string) {
    this.selectedFunc = functionType;
  }

  sendCommand() {
    const command = this.selectedFunc;
    const args = this.form.get(this.selectedFunc)?.value || '';

    this.webSocketService.sendCommand(command, args);
    // localStorage.setItem('lastCommand', JSON.stringify({ command, args }));
  }
}
