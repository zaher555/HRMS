import { ShowEmployeeComponent } from './components/show-employee/show-employee.component';
import { Routes } from '@angular/router';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddUser1Component } from './components/add-user1/add-user1.component';
import { AddUser2Component } from './components/add-user2/add-user2.component';
import { EditAttendaceComponent } from './components/edit-attendace/edit-attendace.component';
import { EditReportComponent } from './components/edit-report/edit-report.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ShowAdminComponent } from './components/show-admin/show-admin.component';
import { ShowAttendaceComponent } from './components/show-attendace/show-attendace.component';
import { EditHolidaysComponent } from './components/edit-holidays/edit-holidays.component';
import { EditWeekendComponent } from './components/edit-weekend/edit-weekend.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { AddHolidayComponent } from './components/add-holiday/add-holiday.component';
import { AttenedanceDepartureComponent } from './components/attenedance-departure/attenedance-departure.component';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';

export const routes: Routes = [
    {path:'',redirectTo:'homePage',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path: 'homePage',component: HomePageComponent, title:'HomePage'},
    {path: 'addgroup',component: AddGroupComponent, title:'Add Group'},
    {path:'admins',component:AdminsComponent,title:'Admins'},
    {path:'addadmin',component:AddUser1Component,title:'Add Admin'},
    {path:'editadmin/:id',component:EditAdminComponent,title:'edit Admin'},
    {path:'showadmin/:id',component:ShowAdminComponent,title:'show Admin'},
    {path:'employees',component:EmployeesComponent,title:'Employees'},
    {path:'addemployee',component:AddUser2Component,title:'Add Employee'},
    {path:'editemployee/:id',component:EditEmployeeComponent,title:'edit Employee'},
    {path:'showemployee/:id',component:ShowEmployeeComponent,title:'show Employee'},
    {path:'generalsettings',component:GeneralSettingsComponent,title:'General Settings'},
    {path:'edit-weekend',component:EditWeekendComponent,title:'edit weekend'},
    {path: 'addholiday',component: AddHolidayComponent, title:'Add Holiday'},
    {path: 'editholiday/:id',component: EditHolidaysComponent, title:'edit Holiday'},
     {path:'addattendance',component:AddAttendanceComponent,title:'new Attendance'},
     {path:'attendance-departure',component:AttenedanceDepartureComponent,title:'Attendance'},
     {path:'editattendance/:id',component:EditAttendaceComponent,title:'edit Attendance'},
     {path:'show-attendance/:id',component:ShowAttendaceComponent,title:'show Attendance'},
     {path:'login',component:LoginComponent,title:'Login'},
     {path:'salaryreport',component:SalaryReportComponent,title:'salary Report'},
     {path:'editsalaryreport',component:EditReportComponent,title:'Edit salary Report'},
     {path:'**', component: HomePageComponent, title:'Page Not Found'} ]
