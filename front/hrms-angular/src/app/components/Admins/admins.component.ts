import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component,ViewChild } from '@angular/core';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { LoaderComponent } from '../loader/loader.component';
import { adminResponse, AdminService } from '../../Services/Admin/admin.service';
import {faEdit, faDeleteLeft,faEye  }  from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule,RouterModule,MatTableModule,MatPaginatorModule,LoaderComponent,MatIconModule,FontAwesomeModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  deleteicon=faDeleteLeft;
  edit=faEdit;
  show=faEye;
  constructor(private adminServise: AdminService,private router:Router){

  }  
  admins!:adminResponse[];
  dataSource=new MatTableDataSource<adminResponse>([]);
  displayedColumns: string[] = [ 'id','fullname', 'email', 'username', 'group_name','actions'];
  onboard:any='./assets/images/onboard(1).png';
  isLoading: boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.getAdminList();
  }
  getAdminList(){
    // this.isLoading=true;
    this.adminServise.getAdmins().subscribe((result:any)=>{
      console.log(result);
      // this.isLoading=false;
      this.admins=result.user;
      this.dataSource.data=this.admins;
    })
  }
  printPage()
  {
    window.print();
  }
delete(adminId:number){
  if (confirm('Are you sure you want to delete this record')){
    this.adminServise.deleteAdmin(adminId).subscribe({
      next: (res:any)=>{
        this.getAdminList();
        alert(res.message);
        this.router.navigate(['/admins']);

      }
    })
  }


}


}
