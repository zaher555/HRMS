import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface User {
  email: string;
  password: string | number;
}

@Injectable({
  providedIn: 'root',
})


export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }

  isTokenExpired(token: string): boolean {
      return !token || token.trim() === '';
  }

  isLoggedIn(): boolean {
      const token = localStorage.getItem('token');
      return token !== null && token.trim() !== '';
  }

  login(email: string, password: string): Observable<any> {
      const body = { email, password };
      return this.http.post<any>(this.loginUrl, body).pipe(
          tap((response:any) => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('name', response.full_name); 
          }));
  }

  getUserName(): string | null {
      return localStorage.getItem('name');
  }

 logout(): Observable<any> {
      
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });
      return this.http.post(`http://127.0.0.1:8000/api/logout`, {}, { headers }).pipe(
        tap(()=>{
          localStorage.removeItem('token');
        })
      );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Adjust based on how you're storing auth data
  }
      
}
