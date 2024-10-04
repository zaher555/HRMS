import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekendsService {

  baseUrl: string = "http://127.0.0.1:8000/api/weekend";
  
  constructor(private http: HttpClient) {}

  getWeekends(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getWeekendById(weekId: any): Observable<any> {
    // Use backticks for string interpolation
    return this.http.get<any>(`${this.baseUrl}/${weekId}`);
  }

  newWeekend(name1: string, date1: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, { name: name1, date: date1 }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Error adding weekend:', error);
        return throwError(() => new Error('Error adding weekend'));
      })
    );
  }

  updateWeekend(weekId: any, name1: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${weekId}`, { name: name1 }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Error updating weekend:', error);
        return throwError(() => new Error('Error updating weekend'));
      })
    );
  }

  deleteWeekend(weekId: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${weekId}`);
  }
}
