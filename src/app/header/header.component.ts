import { Component, EventEmitter, Output } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output()
  courseSelected = new EventEmitter<void>();

  onCourseSelected(): void {
    this.courseSelected.emit();
  }
}
