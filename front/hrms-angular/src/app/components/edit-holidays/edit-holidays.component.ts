import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Holiday, HolidayService } from '../../Services/holiday/holiday.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  MatIconModule } from '@angular/material/icon';
import {faEdit, faDeleteLeft, faEye,faLongArrowRight  }  from '@fortawesome/free-solid-svg-icons';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-edit-holidays',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,FontAwesomeModule,MatIconModule,MatInputModule,RouterModule],
  templateUrl: './edit-holidays.component.html',
  styleUrl: './edit-holidays.component.css'
})
export class EditHolidaysComponent {
  faLongArrowRight=faLongArrowRight;
  editForm!:FormGroup;
  holidayId!:number;
  holidays!:Holiday[];
  selectedHoliday:any  = {}; 
  errors:any[]=[];
  constructor(private holidayService:HolidayService,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar,
    private fb:FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      holiday_date: ['', Validators.required],
    });

   }
  ngOnInit(): void {
    // console.log('initilaized');
    
    this.holidayId= this.route.snapshot.params['id'];
    this.loadHoliday();
  }
  loadHoliday(){
    this.holidayService.getHoliday(this.holidayId).subscribe({
      next: (res) => {
        console.log(res.holiday);
        
        this.editForm.patchValue(res.holiday);
      },
      error: (error) => {
        console.log('Error retrieving holidays', error);
      }
    })
    
  }
EditHoliday(holidayId:any) 
{
  
  this.holidayService.updateHoliday(holidayId,this.editForm.value).subscribe({
    next: (res)=>{

      // console.log(res.holiday);
      this.snackBar.open('holiday updated successfully ✔' ,'close',{duration: 3000});
      this.router.navigate(['/addholiday'])
      
    },
    error: (err) => {
      this.errors=err.error.errors;
      // console.error('Error updating holiday:', err);
      this.snackBar.open('error occured , try again !','close',{duration: 3000});
    }

  })
}

  logoSrc:string='./assets/images/pioneerslogo(1).png';
}
