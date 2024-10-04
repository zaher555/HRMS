import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/authService/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (!this.email) {
      this.errorMessage = "Email is required.";
      return;
  }

  if (!this.password) {
      this.errorMessage = "Password is required.";
      return;
  }

  this.authService.login(this.email, this.password).subscribe(
    (response:any) => {
      if (response.status && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.full_name); 
          this.router.navigate(['homepage']);
      } else {
          alert('Check your Email or Password');
      }
  },
  (error:any) => {
      this.errorMessage = "Your passsword or email is incorrect";
  }
 );
  }
}