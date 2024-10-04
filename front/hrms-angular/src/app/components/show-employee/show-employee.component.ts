import { department } from './../../Services/emloyee/employee.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../Services/emloyee/employee.service';
import { LoaderComponent } from '../loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule
    ,RouterModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatInputModule,
    LoaderComponent
  ],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css'
})
export class ShowEmployeeComponent {
  faLongArrowRight=faLongArrowRight;
  employeeId!:number;
  employeeForm!:FormGroup;
  departments:any=[];
  departmentName!:string;
  errors:any={};
  isLoading:boolean=true;
  constructor(private route:ActivatedRoute,
    private fb: FormBuilder,
    private employeeService : EmployeeService,
    private router:Router ){


     this.employeeForm = this.fb.group({
        name: [''],
        ssn: [''],
        phone: ['' ],
        hire_date: [''],
        salary: ['',],
        department_id: [''],
        check_in: [''],
        check_out: [''],
        gender: [''],
        address: [''],
        doa: [''],
      });
  

  }
 
  loadEmployee(){
    this.employeeService.getEmployee(this.employeeId).subscribe({
    next: ( res)=>{
      console.log(res);
     
        this.employeeForm.patchValue(res.employee);
          this.loadDepartments(res.employee.department_id);
        
      this.isLoading=false;
      
      },
    error:  (err)=>{
      console.log(err);
      this.isLoading=false;
      alert('Error loading employee details');
      this.errors=err.error.errors;
     
      }
    });
  }
  loadDepartments(departmentId:number){
    this.employeeService.getdepartments()
    .subscribe({
      next: (dep:any)=>{
        console.log(dep);
        this.departments=dep.department
        const department= this.departments.find((d:any)=> d.id == departmentId);
        this.departmentName= department? department.department_name : 'UnKnown';
        
      },
      error: (er:any)=>{
        this.errors=er.error.errors;
        console.error('error Loading departments','errors');
      },
    })
  }
 
ngOnInit(){
  this.employeeId= this.route.snapshot.params['id'];

  this.loadEmployee();
}
}
