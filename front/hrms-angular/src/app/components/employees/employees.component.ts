import { employeeResponse, EmployeeService } from './../../Services/emloyee/employee.service';
import { CommonModule } from '@angular/common';
import { Component,ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import {MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import {faEdit, faDeleteLeft,faEye  }  from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [LoaderComponent,CommonModule,RouterModule,MatPaginatorModule,MatTableModule,MatCardModule,FontAwesomeModule,MatIconModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  deleteicon=faDeleteLeft;
  edit=faEdit;
  show=faEye;
  constructor( private employeeService: EmployeeService,private snackbar:MatSnackBar,private router:Router){

  }  
  employees!:employeeResponse[];
  dataSource=new MatTableDataSource<employeeResponse>([]);
  displayedColumns: string[] = ['id','name', 'phone','salary','hire_date','ssn','check_in','check_out','address','department_name','gender','doa','actions'];
  onboard:any='./assets/images/onboard(1).png';
  isLoading: boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.getEmployeeList();
  }
  getEmployeeList(){
    this.isLoading=true;
    this.employeeService.getEmployees().subscribe((result:any)=>{
      console.log(result);
      this.isLoading=false;
      this.employees=result.employee;
      this.dataSource.data=this.employees;
    })
  }
  printPage()
  {
    window.print();
  }

  delete( employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
     
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: (res:any) => {
          this.getEmployeeList(); 
          this.snackbar.open('Employee deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Error deleting employee', err);
          this.snackbar.open('Failed to delete employee', 'Close', { duration: 3000 });
        }
      });
    }
  }

}
