import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private apiUrl='http://127.0.0.1:8000/api/privilege';
  constructor(private http:HttpClient) { }
  getAllPermissions():Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  sendPermisson(sending:any):Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}`,sending)
  }
}
