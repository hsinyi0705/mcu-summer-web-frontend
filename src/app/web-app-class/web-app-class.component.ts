import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-web-app-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule and ReactiveFormsModule here
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

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.message$.subscribe((message) => {
      console.log('Received message:', message);
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
