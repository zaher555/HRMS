import printJS from 'print-js';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import {faPrint }  from '@fortawesome/free-solid-svg-icons';
import { AttendanceService, monthlyReport } from '../../Services/attendnace/attendance.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-salary-report',
  standalone: true,
  imports: [SidebarComponent,MatTooltipModule,MatTableModule,MatPaginatorModule,CommonModule,FontAwesomeModule,MatIconModule],
  templateUrl: './salary-report.component.html',
  styleUrl: './salary-report.component.css'
})
export class SalaryReportComponent {
  month: number | null = null;
  months:any[]=['Saturday','Sunday','Monday','Tuesday','Wedensday','Thursday','Friday'];
  year: number | null = null;
  years:number[]=[];
  errorMessage: string = '';
  print=faPrint;
  monthNow:boolean=true;
  report!:monthlyReport[];
  dataSource = new MatTableDataSource<monthlyReport>([]);
  onboard:any='./assets/images/onboard(1).png';
  isLoading: boolean=false;
  displayedColumns: string[] = ['employee_name', 'department_name', 'basic_salary', 'total_attendance_days','total_departure_days','additional_hours','discount_hours','total_addition', 'total_discount','net_salary','actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor (private attendanceService : AttendanceService,private router:Router,private httpClient: HttpClient){
    const currentYear = new Date().getFullYear();
    for (let i = 2008; i <= currentYear; i++) {
      this.years.push(i);

  }
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.dataSource.filterPredicate=(data:monthlyReport,filter:string): boolean => {
      const emloyee_name=data.employee_name.toLowerCase();
      const department_name=data.department_name.toLowerCase();
      return this,emloyee_name.includes(filter) || department_name.includes(filter);

}
  
    this.loadReport();
  }
  loadReport() {
    this.attendanceService.getMonthlyReport().subscribe({
      next: (res:any)=>{
        
        this.report=res.report;
        console.log(this.report);
        this.dataSource.data =this.report;
      },
      error: (err)=>{
        console.log(err);
        alert('Error loading report');
      }
    });
  }
  filter(month: any , year: any) {
    // Ensure month and year are provided
    if (!month || !year) {
      alert('Please provide both month and year');
      return;
    }
    const indexedMonth=this.months.indexOf(month)+1;
    
    this.attendanceService.getReportByMonth(indexedMonth,year).subscribe({
      next: (res: any) => {
        this.monthNow = false;
        this.report = res.report;  
        this.dataSource.data = this.report; 
        this.dataSource.paginator = this.paginator; 
      },
      error: (err: any) => {
        console.log(err);
        alert('Error loading report');
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter=filterValue;
  }

  printSalary(salary: any): void {
    const printContent = `
      <div>
        <h1>Salary Details</h1>
        <hr>
        <div class='content'>
         <p><strong>Name:</strong> ${salary.employee_name}</p>
        <p><strong>Department:</strong> ${salary.department_name}</p>
        <p><strong>Basic Salary:</strong> ${salary.basic_salary}</p>
        <p><strong>Work Days:</strong> ${salary.total_attendance_days}</p>
        <p><strong>Absence Days:</strong> ${salary.total_departure_days}</p>
        <p><strong>Total Bonus Hours:</strong> ${salary.additional_hours}</p>
        <p><strong>Total Deduction Hours:</strong> ${salary.discount_hours}</p>
        <p><strong>Bonus Amount:</strong> ${salary.total_addition}</p>
        <p><strong>Deductions Amount:</strong> ${salary.total_discount}</p>
        </div>
        <hr>
        <p id="sub-title"><strong>Total Salary:</strong> ${salary.net_salary}</p>
      </div>
    `;
    printJS({
      printable: printContent,
      type: 'raw-html',
      style: `
        h1 { text-align: center; }
        div { font-family: Arial, sans-serif;}
        #sub-title{font-size:18px ; color:#e94d65;text-align:end}
      `,
      scanStyles: false
    });
  }

}

 











 

