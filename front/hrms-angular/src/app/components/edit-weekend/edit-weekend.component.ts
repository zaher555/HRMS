import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeekendsService } from '../../Services/weekend/weekend.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-weekend',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule,MatIconModule,FontAwesomeModule,MatInputModule,MatSelectModule,FormsModule],
  templateUrl: './edit-weekend.component.html',
  styleUrl: './edit-weekend.component.css'
})
export class EditWeekendComponent {
  faLongArrowRight=faLongArrowRight;
  logoSrc:string='./assets/images/pioneerslogo(1).png';
  weekends:any[]=[]
  weekendId1:any=''
  weekendId2:any=''
  Weekend1!:string
  Weekend2!:string
  errorMessage: string = '';
  successMessage:string=''
  editForm!:FormGroup;
  weekDays=['No weekend','saturday','sunday','monday','tuesday','wednesday','thursday','friday']
  constructor(private weekserv:WeekendsService,private fb: FormBuilder) {
    this.editForm=this.fb.group({
      Weekend1:['',Validators.required],
      Weekend2:['',Validators.required]      
    })

  }
  changeValue1() {
    if (this.Weekend1 === this.Weekend2) {
      // Handle case where both selected days are the same
      this.Weekend2 = 'No Weekend'; // or any other logic
    }
    console.log(this.Weekend1);
  }

  changeValue2() {
    if (this.Weekend2 === this.Weekend1) {
      this.Weekend1 = 'No Weekend'; // or any other logic
    }
    console.log(this.Weekend2);
  }
  ngOnInit(): void {
    this.getAllWeekends();
  }
  getAllWeekends():any
  {
    this.weekserv.getWeekends().subscribe({
      next:(res)=>{
        this.weekends=res.weekends;
        if (this.weekends.length > 0) {
          this.Weekend1 = this.weekends[0]?.name || 'No Weekend';
          this.editForm.patchValue({
            weekend1: this.Weekend1
          });
        }

        if (this.weekends.length > 1) {
          this.Weekend2 = this.weekends[1]?.name || 'No Weekend';
          this.editForm.patchValue({
            weekend2: this.Weekend2
          });
        }

        return res.weekends;
      },
      error: (error) => {
        console.log('Error fetching weekends:', error);
      }
    });
  }
  newWeekend(weekName: string) {
    const payload = { name: weekName, date: '2024-10-10' };
    this.weekserv.newWeekend(weekName, '2024-10-10').subscribe({
      next: (res) => {
        console.log('Weekend added:', res);
        this.getAllWeekends(); // Refresh the weekends after adding
        this.successMessage='Weekend added successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to add weekend. Please try again.';
        console.log(error);
      }
    });
  }

  updateWeekend(weekId: string, weekName: string) {
    this.weekserv.updateWeekend(weekId, weekName).subscribe({
      next: (res) => {
        console.log('Weekend updated:', res);
        this.getAllWeekends(); // Refresh the weekends after updating
        this.successMessage='Weekend updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deleteWeekend(weekId: any) {
    this.weekserv.deleteWeekend(weekId).subscribe({
      next: (res) => {
        console.log('Weekend deleted:', res);
        this.getAllWeekends(); // Refresh the weekends after deletion
        this.successMessage='Weekend deleted successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  save() {
    console.log('Current weekends before save:', this.weekends);

    // Handle cases for Weekend1
    if (this.Weekend1 === 'No Weekend') {
      if (this.weekends.length > 0) {
        this.deleteWeekend(this.weekends[0].id); // Delete first weekend if exists
      }
    }

    // Handle cases for Weekend2
    if (this.Weekend2 === 'No Weekend') {
      if (this.weekends.length > 1) {
        this.deleteWeekend(this.weekends[1].id); // Delete second weekend if exists
      }
    }

    // If both weekends are "No Weekend", delete all existing weekends
    if (this.Weekend1 === 'No Weekend' && this.Weekend2 === 'No Weekend') {
      if (this.weekends.length > 0) {
        this.weekends.forEach(weekend => this.deleteWeekend(weekend.id));
      }
    } else {
      // Handle cases for Weekend1
      if (this.Weekend1 !== 'No Weekend') {
        if (this.weekends.length === 0) {
          // Create new weekend for Weekend1
          this.newWeekend(this.Weekend1);
        } else {
          // Update existing weekend for Weekend1
          this.weekendId1 = this.weekends[0].id;
          this.updateWeekend(this.weekendId1, this.Weekend1);
        }
      }

      // Handle cases for Weekend2
      if (this.Weekend2 !== 'No Weekend') {
        if (this.weekends.length === 0) {
          // Create new weekend for Weekend2
          this.newWeekend(this.Weekend2);
        } else {
          // Update existing weekend for Weekend2 if it exists
          this.weekendId2 = this.weekends[1]?.id; // Use optional chaining
          this.updateWeekend(this.weekendId2, this.Weekend2);
        }
      }
    }

    // Refresh the weekends array after operations
    this.getAllWeekends();
  }




}
