// import { CommonModule, NgFor } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { WebSocketService } from '../websocket.service';

// @Component({
//   selector: 'app-web-app-class',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, NgFor],
//   templateUrl: './web-app-class.component.html',
//   styleUrls: ['./web-app-class.component.css'],
// })
// export class WebAppClassComponent implements OnInit {
//   form = new FormGroup({
//     id: new FormControl(''),
//     ip: new FormControl(''),
//     addLocation: new FormControl(''),
//     goToLocation: new FormControl(''),
//     deleteLocation: new FormControl(''),
//     speak: new FormControl(''),
//   });

//   selectedFunc: string = '';
//   locations: string[] = []; // 新增一个数组用于存储地点

//   constructor(private webSocketService: WebSocketService, private http: HttpClient) {
//     // this.webSocketService.message$.subscribe((message) => {
//     //   console.log('Received message:', message);
//     //   if (message) {
//     //     if (message.type === 'onConnect') {
//     //       console.log('Updating form with ID and IP:', message.id, message.ip);
//     //       this.form.patchValue({
//     //         id: message.id,
//     //         ip: message.ip,
//     //       });
//     //     }
//     //     if (message.command === 'addLocation' && message.status === 'added') {
//     //       this.locations.push(message.location);
//     //     } else if (message.command === 'deleteLocation' && message.status === 'deleted') {
//     //       this.locations = this.locations.filter((loc) => loc !== message.location);
//     //     }
//     //   }
//     // });
//     this.webSocketService.message$.subscribe((message) => {
//       console.log('Received message:', message);
//       if (message) {
//         if (message.type === 'onConnect') {
//           console.log('Updating form with ID and IP:', message.id, message.ip);
//           this.form.patchValue({
//             id: message.id,
//             ip: message.ip,
//           });
//         }
//         if (message.command === 'addLocation' && message.status === 'added') {
//           this.locations.push(message.location);
//         } else if (message.command === 'deleteLocation' && message.status === 'deleted') {
//           this.locations = this.locations.filter((loc) => loc !== message.location);
//         }
//       }
//     });

//   }

//   ngOnInit(): void {
//     this.http.get<{ locations: string[] }>('http://localhost:5000/api/locations').subscribe(
//       (data) => {
//         this.locations = data.locations;
//         // 确保下拉框的初始值设为显示提示字
//         this.form.get('goToLocation')?.setValue('');
//         this.form.get('deleteLocation')?.setValue('');
//       },
//       (error) => {
//         console.error('Failed to load locations:', error);
//       }
//     );
//   }

//   selectFunc(functionType: string) {
//     this.selectedFunc = functionType;
//   }

//   sendCommand() {
//     const command = this.selectedFunc;
//     const args = this.form.get(this.selectedFunc)?.value || '';

//     // 直接传递 args 对象
//     this.webSocketService.sendCommand(command, args);

//     // 重置表单字段
//     this.form.get('addLocation')?.reset();
//     this.form.get('goToLocation')?.setValue(''); // 确保提示字显示
//     this.form.get('deleteLocation')?.setValue(''); // 确保提示字显示
//     this.form.get('speak')?.reset();

//     // 可选：重置选中的功能
//     this.selectedFunc = '';
//   }
// }
// //------------------------
// web-app-class.component.ts
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from '../websocket.service';

let a_id = "12888"; // this
let b_ip = "456";  // this

@Component({
  selector: 'app-web-app-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './web-app-class.component.html',
  styleUrls: ['./web-app-class.component.css'],
})
export class WebAppClassComponent implements OnInit {
  form = new FormGroup({
    ip: new FormControl(''),
    id: new FormControl(''),
    addLocation: new FormControl(''),
    goToLocation: new FormControl(''),
    deleteLocation: new FormControl(''),
    speak: new FormControl(''),
  });

  selectedFunc: string = '';
  locations: string[] = [];

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {
    this.webSocketService.message$.subscribe((message) => {
      console.log('Received message in WebAppClassComponent:', message);
      if (message) {
        if (message.type === 'onConnect') {
          console.log('Updating form with ID and IP:', a_id, b_ip);
          this.form.patchValue({
            id: a_id,
            ip: b_ip,
          });
        }
        if (message.command === 'addLocation' && message.status === 'added') {
          this.locations.push(message.args.location);
          console.log('Location added:', message.args.location);
        } else if (message.command === 'deleteLocation' && message.status === 'deleted') {
          this.locations = this.locations.filter((loc) => loc !== message.args.location);
        }
      } else {
        console.warn('Received null or undefined message in WebAppClassComponent');
      }
    });
  }

  ngOnInit(): void {
    this.http.get<{ locations: string[] }>('http://localhost:5001/api/locations').subscribe(
      (data) => {
        this.locations = data.locations;
        this.form.get('goToLocation')?.setValue('');
        this.form.get('deleteLocation')?.setValue('');
      },
      (error) => {
        console.error('Failed to load locations:', error);
      }
    );
  }

  selectFunc(functionType: string) {
    this.selectedFunc = functionType;
  }

  sendCommand() {
    const command = this.selectedFunc;
    const args = {
      value: this.form.get(this.selectedFunc)?.value || '',
      a_id: a_id,
      b_ip: b_ip,
      addLocation: this.form.get('addLocation')?.value || '',
      goToLocation: this.form.get('goToLocation')?.value || '',
      deleteLocation: this.form.get('deleteLocation')?.value || '',
      speak: this.form.get('speak')?.value || ''
    };

    // 发送命令及参数
    this.webSocketService.sendCommand(command, args);

    // 重置表单字段
    this.form.get('addLocation')?.reset();
    this.form.get('goToLocation')?.setValue('');
    this.form.get('deleteLocation')?.setValue('');
    this.form.get('speak')?.reset();

    // 清空选择的功能
    this.selectedFunc = '';
  }
}

