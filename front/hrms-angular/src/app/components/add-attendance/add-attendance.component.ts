import { AttendanceService } from './../../Services/attendnace/attendance.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-add-attendance',
  standalone: true,
  templateUrl: './add-attendance.component.html',
  imports: [RouterModule, CommonModule, FormsModule, LoaderComponent,FontAwesomeModule],
  styleUrl: './add-attendance.component.css',
})
export class AddAttendanceComponent {
  faArrowRotateForward=faArrowRight;
  employees:any[]=[];
  selectedEmployeeId: number = 0;
  check_in: string = '';  
  check_out: string = ''; 
  bonus_value:number=0;
  deduction_value:number=0;
  date: Date | undefined;  
  errors: any = {};   
  isLoading:boolean=false;
  loadingTitle:string='Loading';


  constructor(private attendanceService: AttendanceService,
    private router:Router, private snackBar:MatSnackBar) {}

ngOnInit(){
  this.loadEmployees();
}
loadEmployees() {
  // this.isLoading = true;
  this.attendanceService.getEmployees().subscribe({
    next: (em: any) => {
      console.log(em); 
    
        this.employees = em.employee;
      
 
    },
    error: (err: any) => {
      this.errors = err.error.errors;
  
      console.log(err.error.errors, 'errors');
    }
  });
}



submitAttendance() {
  this.isLoading=true;
  this.loadingTitle='saving';
  var inputs = {
    employee_id: this.selectedEmployeeId,
    check_in: this.check_in.slice(0,5),
    check_out: this.check_out.slice(0,5),
    deduction_value: this.deduction_value,
    bonus_value: this.bonus_value,
    date: this.date,
  };

  this.attendanceService.submitAttendance(inputs).subscribe({
    next: (res: any) => {
      
      // alert(res.message);
      this.selectedEmployeeId=0;
      this.bonus_value=0;
      this.deduction_value=0;
      this.check_in='';
      this.check_out='';
      this.date=new Date();
      
      this.snackBar.open(res.message,'close',{duration: 3000});
      console.log(res, 'response');
      this.router.navigate(['/attendance-departure']);

      this.isLoading=false;


    },
    error: (er: any) => {
      
      this.errors = er.error.errors; 
      this.isLoading=false;
      this.snackBar.open('error occured , try again !','close',{duration: 3000});
      console.log(er.error.errors, 'errors');

    }
  });
}
 
  
}
