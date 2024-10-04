import { monthlyReport, attendanceResponseType } from './../../Services/attendnace/attendance.service';
import { Component , ViewChild,AfterViewInit, ElementRef} from '@angular/core';
import { AttendanceResponse, AttendanceService } from '../../Services/attendnace/attendance.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatTableDataSource, MatTableModule}from '@angular/material/table'
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { MatIconModule } from '@angular/material/icon';
import {faEdit, faDeleteLeft, faEye, faListAlt  }  from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-attenedance-departure',
  standalone: true,
  imports: [RouterModule, MatPaginatorModule, MatTableModule, CommonModule, MatCardModule, FontAwesomeModule, LoaderComponent,MatIconModule,MatInputModule],
  templateUrl: './attenedance-departure.component.html',
  styleUrl: './attenedance-departure.component.css'
})
export class AttenedanceDepartureComponent {
  deleteicon=faDeleteLeft;
  edit=faEdit;
  show=faEye;
  faListAlt=faListAlt;

  attendance!:AttendanceResponse[];
  dataSource = new MatTableDataSource<AttendanceResponse>([]);
  onboard:any='./assets/images/onboard(1).png';
  searchedAttendance!:AttendanceResponse[];
  isLoading: boolean=false;
  // @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  @ViewChild('pdfTable', { static: true }) pdfTable!: ElementRef;
  displayedColumns: string[] = ['id','employee_name', 'department_name', 'check_in', 'check_out','date','actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor (private attendanceService : AttendanceService,private router:Router){}
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.dataSource.filterPredicate=(data:AttendanceResponse,filter:string): boolean => {
           const emloyee_name=data.employee.name.toLowerCase();
           const department_name=data.employee.department.department_name.toLowerCase();
           return this,emloyee_name.includes(filter) || department_name.includes(filter);

    }
    this.getAttendnaceList();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter=filterValue;
  }
  getAttendnaceList(){
    // this.isLoading=true;
    this.attendanceService.getList().subscribe((res)=>{
        console.log(res.attendance);
        this.attendance = res.attendance;
        this.dataSource.data = this.attendance;
        // this.isLoading=false;
      });
  }

  

  fullText: string = 'Attendance and departure';
  displayedText: string = '';
  typingSpeed: number = 100; // Speed of typing in milliseconds


  
  printPage()
  {
    window.print();
  }
  delete(attendanceId:any) {
    if (confirm('Are you sure you want to delete this record')){
      this.attendanceService.delattendance(attendanceId).subscribe({
        next:(res:any)=> {
          this.getAttendnaceList();
          alert(res.message);
          this.router.navigate(['/attendance-departure']);
          
        }  ,
        error:
        (err) => {
          alert('Error deleting attendance');
          console.error('error in delete process, try again',err);
          
        }
      })

    }

  }
  showResult(empName:any,from:any,to:any)
  {
    if (!empName) {
      alert('Please enter an employee name.');
    }
    this.attendanceService.searchAttendanceByname(empName,from,to).subscribe({
      next:(res:any)=>{
        
        this.attendance = res;
        this.dataSource.data = this.attendance;
        console.log(this.dataSource.data );
        console.log(this.attendance);
   
        if (this.paginator) {
          this.paginator.firstPage();
        }
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  exportToExcel(): void {
    // Create a worksheet from the data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.attendance);

    // Create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Export the workbook
    XLSX.writeFile(workbook, 'data.xlsx');
  }
  generatePDF(): void {
    const dataTable = document.getElementById('pdfTable');

    html2canvas(dataTable!).then(canvas => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; 
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10;

    
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

    
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('table.pdf');
    });
  }
 
}



