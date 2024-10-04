import { group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../Services/Admin/admin.service';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ReactiveFormsModule,
  RouterModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatInputModule,
    MatSelectModule,
    LoaderComponent
  ],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent {
  faLongArrowRight=faLongArrowRight;
adminForm!:FormGroup;
adminId!:number;
groups!:any;
isLoading:boolean=false;
loadingTitle="loading";
errors:any={}
constructor(private route:ActivatedRoute,private adminService :AdminService,private fb: FormBuilder, private router:Router){

  this.adminForm=this.fb.group({ 
    fullname : [''],
    username : [''],
    email: [''],
    group_id: ['']
  }
  
  );
  
}
loadGroup(){
  this.adminService.getGroup().subscribe({
    next:(res:any)=>{ 
      this.groups=res.group},
      error:(err)=>{
          this.errors=err.error.errors;
          console.error('error loading departmnts',err);
        }
  });
}
loadAdmin(){
  this.adminService.getAdmin(this.adminId).subscribe({
    next: (res) => {
     
      this.adminForm.patchValue({
        fullname: res.user.fullname,
        username: res.user.username,
        email: res.user.email,
        group_id: res.user.group_id
      });
    }
  })
  
}

formsubmit() {
  if(this.adminForm.valid){
    this.adminService.updateAdmin(this.adminId,this.adminForm.value).subscribe({
      next: (res)=>{
        console.log('user updated successfully',res);
        alert('user updated successfully');
        this.router.navigate(['/admins']);
      
      },
      error:(err)=>{
        this.errors=err.error.errors;
        console.log('user updating failed !',err);
        alert('user updating failed, try later');
     
      }
    })
  }
}

ngOnInit(){
  this.adminId= this.route.snapshot.params['id'];
  this.loadGroup();
  this.loadAdmin();
}
}
