import { group } from '@angular/animations';
import { AttendanceService } from './../../Services/attendnace/attendance.service';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import {  MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-attendace',
  standalone: true,
  imports: [ReactiveFormsModule,SidebarComponent,CommonModule,LoaderComponent,RouterModule,FormsModule,FontAwesomeModule,MatIconModule,MatInputModule],
  templateUrl: './edit-attendace.component.html',
  styleUrl: './edit-attendace.component.css'
})
export class EditAttendaceComponent {
  faLongArrowRight=faLongArrowRight;
  fullText: string = 'Edit Attendance and departure';
  displayedText: string = '';
  typingSpeed: number = 100; // Speed of typing in milliseconds
  
  
  attendnaceId!:number;
  attendnaceForm!:FormGroup;
  updatedattendnace!:any;
  // employees!:any;
  errors: any = {};   
  isLoading:boolean=true;
  loadingTitle:string='Loading';
  constructor(private route:ActivatedRoute,
    private attendanceService: AttendanceService,
    private fp: FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar)
  {
    this.attendnaceForm=this.fp.group({
      employee_id:[''],
      name:[''],
      department:[''],
      check_in:[''],
      check_out:[''],
      bonus_value:[''],
      deduction_value:[''],
      date:[''],
      hours:[''],
      status:['']
    })


  }
  attendanceLoad(){
    this.attendanceService.getAttendance(this.attendnaceId).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading=false;
        this.attendnaceForm.patchValue(
          {
            employee_id: res.attendance.employee_id,         
            name: res.attendance.employee.name,         
            department: res.attendance.employee.department.department_name,         
            check_in: res.attendance.check_in.substring(0,5),         
            check_out: res.attendance.check_out.substring(0,5),   
            bonus_value:res.attendance.bonus_value,       
            deduction_value:res.attendance.deduction_value,             
            date: res.attendance.date,         
            hours: res.attendance.hours,         
            status: res.attendance.status,       
             }
        );
      },
      error: (err:any)=>{
        console.log(err);
        this.isLoading=false;
        this.errors=err.error.errors;
        this.displayedText = 'Error loading attendnace details';
        setTimeout(this.typeWriter, 2000); 
      }
    });
  }
  
  updateAttendance() {
    if(this.attendnaceForm.valid){
      this.attendanceService.updateAttendance(this.attendnaceId,this.attendnaceForm.value).subscribe({
        next: (res:any) => {
          // alert('Attendance updated successfully:')
          console.log('Attendance updated successfully:', res);
          this.snackBar.open('employee has been edited successfully ✔','close',{duration: 3000});
          this.isLoading=false;
          this.router.navigate(['/attendance-departure']);
        },
        error: (err:any) => {
          this.errors=err.error.errors;
          console.error(this.errors);
          this.isLoading=false;
          // alert('Error updating attendnace details');
          this.snackBar.open('Failed to edit holiday', 'Close', { duration: 3000 });

          this.displayedText = 'Error updating attendnace details';
          setTimeout(this.typeWriter, 2000);
        }
      });
    }
 
  }
  
  
  
  ngOnInit(): void {
    this.attendnaceId= this.route.snapshot.params['id'];
    this.attendanceLoad();
    // alert(this.attendnaceId);

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
