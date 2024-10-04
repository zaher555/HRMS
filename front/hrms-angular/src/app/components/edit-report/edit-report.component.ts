import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-edit-report',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css'
})
export class EditReportComponent {
  fullText: string = 'Edit Employees Salary Report';
  displayedText: string = '';
  typingSpeed: number = 100; // Speed of typing in milliseconds

  ngOnInit(): void {
    this.typeWriter();
  }

  typeWriter(): void {
    let i = 0;
    const type = () => {
      if (i < this.fullText.length) {
        this.displayedText += this.fullText.charAt(i);
        i++;
        setTimeout(type, this.typingSpeed); // Adjust typing speed here
      }
    };
    type();
  }
}
