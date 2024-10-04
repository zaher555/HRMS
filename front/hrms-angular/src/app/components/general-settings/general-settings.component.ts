import { GeneralSettingsService } from './../../Services/general-settings/general-settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditWeekendComponent } from '../edit-weekend/edit-weekend.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule,MatInputModule],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent implements OnInit {
  logoSrc:string='./assets/images/pioneerslogo(1).png';
  GeneralSettings:any[]=[];
  generalSettingId!:number;
  alertMessage!:string;
  errors!:[];
  editForm!:FormGroup;
  constructor(private GeneralSettingsServ:GeneralSettingsService,private router:Router,private route:ActivatedRoute,private snackbar:MatSnackBar,private fb: FormBuilder){
    this.editForm=this.fb.group({
      add_ons:['',Validators.required],
      discount:['',Validators.required],
    })
  }
  ngOnInit()
  {
   
    this.allGeneral();
  }
  
  allGeneral()
  {
    this.generalSettingId=1;
    this.GeneralSettingsServ.getGeneralSetting(this.generalSettingId).subscribe({
      next:(res:any)=>{

        console.log(res.generalSettings);
        
        this.editForm.patchValue(res.generalSettings);
        console.log(this.editForm.value);
        
      },
      error:(error)=>{
        alert('error retrieving Data');
      }
     
    });
  }
  add(bonus:any,deduction:any)
  {
    this.GeneralSettingsServ.newGeneralSettings(bonus,deduction).subscribe({
      next:(res)=>{
        console.log('come');
      },
      error:(err)=>{
        console.log('not come');
      }
    })
  }
  update(add_ons:any,discount:any)
  {
    this.GeneralSettingsServ.updateGeneralSettings(add_ons,discount,1).subscribe({
      next:(res)=>{
        console.log(res);
        this.snackbar.open('you\'ve update add-ons and discount value successfully ✔','close',{duration:3000});
        

      },
      error:(err)=>{
        console.log(err);
        this.snackbar.open('something wrong happen, try againa !','close',{duration:3000});

      }
    })
  }
}
