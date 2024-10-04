
import { routes } from './app.routes';

import { Component ,computed, signal} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditAttendaceComponent } from "./components/edit-attendace/edit-attendace.component";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { AttenedanceDepartureComponent } from './components/attenedance-departure/attenedance-departure.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { AuthService } from './Services/authService/authservice.service';

@Component({
  selector: 'app-root',
  standalone: true,


  imports: [

    RouterModule,
    FontAwesomeModule,FormsModule,
    RouterModule,
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidebarComponent,
    LoginComponent,
    SalaryReportComponent,
    AttenedanceDepartureComponent, GeneralSettingsComponent,

],


  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user_name=localStorage.getItem('name');
  constructor(private router:Router,private authService:AuthService){}

  isLogin():boolean{
    return this.router.url === '/login';
  }
  collapsed=signal(true);
  sideNavWidth=computed(()=>this.collapsed() ? '64px': '250px');
logout()
{
this.authService.logout().subscribe({
  next:(res:any)=>{
    if(res.message){ 
       localStorage.removeItem('token');
      this.router.navigate(['/login']);
      } else{
        alert('error in logout !');
      }
  
  }
});
}}
