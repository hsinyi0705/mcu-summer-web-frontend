import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-web-app-class',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './web-app-class.component.html',
  styleUrls: ['./web-app-class.component.css'],
})
export class WebAppClassComponent {
  form = new FormGroup({
    id: new FormControl(''),
    ip: new FormControl(''),
    locationName: new FormControl(''),
    goToLocation: new FormControl(''),
    rotateAngle: new FormControl(''),
  });

  selectedFunc: string = '';

  selectFunc(functionType: string) {
    this.selectedFunc = functionType;
  }
}
