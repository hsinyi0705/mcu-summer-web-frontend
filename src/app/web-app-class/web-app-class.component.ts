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
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-web-app-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './web-app-class.component.html',
  styleUrls: ['./web-app-class.component.css'],
})
// {
// "_default":
// {"4":
//   {"id": "8bc4c48f-ffa2-439f-ac47-10f49f4a1d7e",
//     "ip": "172.16.67.240",
//     "location": "[home base, \u5165\u53e3, a]",
//     "status": "Stand by"}}}
export class WebAppClassComponent implements OnInit {
  form = new FormGroup({
    ip: new FormControl('ip'),
    id: new FormControl(''),
    addLocation: new FormControl(''),
    goToLocation: new FormControl(''),
    deleteLocation: new FormControl(''),
    speak: new FormControl(''),
    // selectedFunction: new FormControl(''),
    // location: new FormControl(''),
  });

  selectedFunc: string = '';
  locations: string[] = [];
  messageid = "128";//this
  messageip = "456"//this
  constructor(private webSocketService: WebSocketService, private http: HttpClient) {
    this.webSocketService.message$.subscribe((message) => {
      console.log('Received message in WebAppClassComponent:', message);
      if (message) {
        if (message.type === 'onConnect') {//message.idmessage.ip
          console.log('Updating form with ID and IP:', this.messageid, this.messageip);
          this.form.patchValue({
            id: this.messageid, //message.id,
            ip: this.messageip,//message.ip,
          });
        }
        if (message.command === 'addLocation' && message.status === 'added') {
          this.locations.push(message.location);
        } else if (message.command === 'deleteLocation' && message.status === 'deleted') {
          this.locations = this.locations.filter((loc) => loc !== message.location);
        }
      } else {
        console.warn('Received null or undefined message in WebAppClassComponent');
      }
    });
  }


  ngOnInit(): void {
    this.http.get<{ locations: string[] }>('http://localhost:5000/api/locations').subscribe(
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
    const args = this.form.get(this.selectedFunc)?.value || '';

    this.webSocketService.sendCommand(command, args);

    this.form.get('addLocation')?.reset();
    this.form.get('goToLocation')?.setValue('');
    this.form.get('deleteLocation')?.setValue('');
    this.form.get('speak')?.reset();

    this.selectedFunc = '';
  }
}

