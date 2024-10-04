import { AdminService } from './../../Services/Admin/admin.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgStyle } from '@angular/common';
import { group } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user1',
  standalone: true,
  imports: [MatFormField,
    FormsModule,
    MatInputModule,
    MatIconModule,
    FontAwesomeModule,
    MatSelectModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './add-user1.component.html',
  styleUrl: './add-user1.component.css'
})
export class AddUser1Component {
  faLongArrowRight = faLongArrowRight;
constructor(private adminService:AdminService,private router:Router,private snackBar:MatSnackBar){}
  // declare inputs

fullname:string='';
username:string='';
email:string='';
password:string='';
groups:any[]=[];
group_id:number=0;

errors:any=[];
isLoadig:boolean=false;
loadingtitle='loading';
ngOnInit(){
this.loadGroups();
this.typeWriter();
}  
loadGroups(){
  this.adminService.getGroup().subscribe({
    next:  (res:any)=>{
      console.log(res);
      
      this.groups=res.group;
    },
      error: (er:any)=>{
        console.log('error log',er);
        
        this.errors=er.error.errors;}
  })
}
  formsubmit() {
    
    var inputs ={

      fullname : this.fullname,
      group_id : this.group_id,
      username : this.username,
      email : this.email,
      password : this.password,
    }

    this.adminService.setAdmin(inputs).subscribe({
      next: (res:any)=>{
        console.log(res);    
        this.snackBar.open(res.message,'close',{duration: 3000});
        this.fullname='';
        this.username='';
        this.email='';
        this.password='';
        this.group_id=0;
        this.router.navigate(['/admins']);

      },
      error: (er)=>{
        this.errors=er.error.errors;
        console.log('error log',er);
        this.snackBar.open('error occured , try again !','close',{duration: 3000});

     
      }
    });
    

}


  logoSrc:string='./assets/images/pioneerslogo(1).png';
  fullText: string = 'New Admin';
  displayedText: string = '';
  typingSpeed: number = 100; // Speed of typing in milliseconds

 
  typeWriter(): void {
    let i = 0;
    const type = () => {
      if (i < this.fullText.length) {
        this.displayedText += this.fullText.charAt(i);
        i++;
        setTimeout(type, this.typingSpeed); // Adjust typing speed here
      }
    };
    type();
  }
}
