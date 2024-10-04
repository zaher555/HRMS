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

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-show-admin',
  standalone: true,
  imports: [ReactiveFormsModule,
  RouterModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './show-admin.component.html',
  styleUrl: './show-admin.component.css'
})
export class ShowAdminComponent {
faLongArrowRight=faLongArrowRight;
adminForm!:FormGroup;
adminId!:number;
groups!:any;
groupName!:string;
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
loadGroup(groupId:number){
  this.adminService.getGroup().subscribe({
    next:(res:any)=>{ 
      this.groups=res.group
      const group = this.groups.find((g:any) => g.id === groupId);
      this.groupName = group ? group.name : 'Unknown';
    },
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
    this.loadGroup(res.user.group_id);
    }
  })
  
}


ngOnInit(){
  this.adminId= this.route.snapshot.params['id'];
 
  this.loadAdmin();
}
}
