import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import {faPrint,faLongArrowLeft }  from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-salary',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,MatIconModule,RouterModule,RouterLinkActive],
  templateUrl: './print-salary.component.html',
  styleUrl: './print-salary.component.css'
})
export class PrintSalaryComponent {
  print=faPrint;
  faLongArrowRight=faLongArrowLeft;
  row:any;
  constructor(private route:ActivatedRoute,private router:Router){
    this.route.queryParams.subscribe(params => {
    
        this.row = JSON.parse(params['data']);
      
      
    });
  }
  ngOnInit(): void {
 
  }

  printPage() {
    
      window.print();
   
  }
}
