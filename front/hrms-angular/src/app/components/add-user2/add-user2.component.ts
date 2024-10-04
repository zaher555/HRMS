import { EmployeeService } from './../../Services/emloyee/employee.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add-user2',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatIconModule

  ],
  templateUrl: './add-user2.component.html',
  styleUrl: './add-user2.component.css'
})
export class AddUser2Component {
  faLongArrowRight=faArrowRight;
logoSrc:string='./assets/images/pioneerslogo(1).png';
name:String='';
phone:string='';
salary:string='';
hire_date:Date | undefined;
ssn:string='';
check_in:string='';
check_out:string='';
address:string='';
department_id:string='';
gender: any='';
doa:Date | undefined;
errors:any=[];
departments:any[]=[];
constructor(private employeeService:EmployeeService,private router:Router, private snackBar:MatSnackBar){}
ngOnInit(){
  this.loadDepartments();
}
loadDepartments(){
  this.employeeService.getdepartments()
  .subscribe({
    next: (dep:any)=>{
      console.log(dep);
      
      this.departments =dep.department;
    },
    error: (er:any)=>{
      this.errors=er.error.errors;
      console.log(er.error.errors,'errors');
    },
  })
}
formSubmit(){
  var inputs={
    'name' : this.name,
    'phone': this.phone,
    'salary':this.salary,
    'hire_date':this.hire_date,
    'ssn':this.ssn,
    'check_in':this.check_in.slice(0,5),
    'check_out':this.check_out.slice(0,5),
    'address':this.address,
    'department_id':this.department_id,
    'gender':this.gender,
    'doa':this.doa,
  }
  this.employeeService.setEmployees(inputs).subscribe({
    next: (res:any)=>{
      this.snackBar.open(res.message,'close',{duration: 3000});
      console.log(res,'response');
      // alert(res.message);
      this.name='';
      this.department_id='';
      this.phone='';
      this.salary='';
      this.ssn='';
      this.check_in='';
      this.check_out='';
      this.address='';
      this.doa=new Date();
      this.hire_date=new Date();
      this.gender='';
      this.router.navigate(['/employees'])
      
    },
    error: (er:any)=>{
      this.errors=er.error.errors;
      console.log(er.error.errors,'errors'); 
      this.snackBar.open('error occured , try again !','close',{duration: 3000});

      
    
    }
  });
 
};
 



}
