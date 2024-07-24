import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Output()
  courseSelected = new EventEmitter<void>();

  selectCourse(): void {
    this.courseSelected.emit();

    const timestamp = new Date().toISOString();
    this.http.post('http://127.0.0.1:5000/api/button-click', { timestamp }).subscribe(
      (response) => {
        console.log('Server response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  constructor(private http: HttpClient) {}

  onButtonClick(): void {
    const timestamp = new Date().toISOString();
    this.http.post('http://127.0.0.1:5000/api/button-click', { timestamp }).subscribe(
      (response) => {
        console.log('Server response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
