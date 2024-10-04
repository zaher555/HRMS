import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PermissionsService } from '../../Services/permissions/permissions.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit{
  allPermissions:any[]=[]
  groupPriviliages: FormGroup;
  pages: string[] = ['employees', 'General Settings', 'Attendance and Departure', 'Salaries Report'];

  constructor(private perimissionServ:PermissionsService,private snackBar:MatSnackBar) {
    this.groupPriviliages = new FormGroup({
      groupName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      permissions: new FormArray(this.pages.map(page => this.createPermissionGroup(page)))
    });
  }
  ngOnInit(): void {
    this.getAllPermissions();
  }
  get groupName() {
    return this.groupPriviliages.get('groupName');
  }

  get permissions() {
    return this.groupPriviliages.get('permissions') as FormArray;
  }

  createPermissionGroup(page: string): FormGroup {
    return new FormGroup({
      page: new FormControl(page),
      add: new FormControl(false),
      remove: new FormControl(false),
      update: new FormControl(false),
      show: new FormControl(false),
    });
  }
  toggleSelectAll(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    const formGroup = this.permissions.at(index) as FormGroup;
    const isChecked = checkbox.checked;
    ['add', 'remove', 'update', 'show'].forEach(action => {
      formGroup.get(action)?.setValue(isChecked);
    });
  }
  sendData() {
    console.log(this.groupPriviliages.value);
    this.perimissionServ.sendPermisson(this.groupPriviliages.value).subscribe({
      next:(res:any)=>{
        this.snackBar.open('group  with permissions added✔','close',{duration:500});
        console.log('sended');
      },
      error:(err:any)=>{
        console.log('not sended');
      }
    });
  }
  getAllPermissions()
  {
    this.perimissionServ.getAllPermissions().subscribe({
      next:(res:any)=>{
        this.allPermissions=res;
        
        console.log(this.allPermissions);

      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
