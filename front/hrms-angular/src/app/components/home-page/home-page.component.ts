import { DashService } from './../../Services/dashboard/dash.service';
import { AttendanceService } from './../../Services/attendnace/attendance.service';
import { Component, ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule}from '@angular/material/table'
import {MatPaginator, MatPaginatorModule}from '@angular/material/paginator'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faFileInvoice, faUserGroup, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
   MatTableModule,
   MatPaginatorModule,
   MatInputModule,
   MatCardModule,
   CommonModule,

  ],
})

export class HomePageComponent implements OnInit {
  counts:any={
    totalemployees:0,
    totalusers:0,
    totalreports:0,
    totalgroups:0
  }; 
  
  constructor(private dashService:DashService){}
    ngOnInit(){
    this.getDash();
  }
  getDash(){
    this.dashService.getdash().subscribe((data:any)=>{
      
      this.counts = {
        totalemployees: data['totalemployees'] || 0,
        totalusers: data['totalusers'] || 0,
        totalreports: data['totalreports'] || 0,
        totalgroups: data['totalgroups'] || 0
      };
      console.log(this.counts);
    })
  }

  doorOpenIcon=faDoorOpen;
  fileInvoice=faFileInvoice;
  userGroupIcon=faUserGroup;
  usersLineIcon=faUsersLine;

}

