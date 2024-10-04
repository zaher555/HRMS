import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Holiday{
  id:number,
  name:string,
  holiday_date:String
}

export interface HolidaysResponseType{
  status:number,
  holidays:Holiday[]
}
export interface HolidayResponse{
  status:number,
  holiday:Holiday[]
}
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private apiUrl = 'http://127.0.0.1:8000/api/holidays';  

  constructor(private http: HttpClient) {}

  // Get the list of holidays
  getHolidays(): Observable<HolidaysResponseType> {
    return this.http.get<HolidaysResponseType>(this.apiUrl);
  }
 

  // Add a new holiday
  addHoliday(inputs:Holiday): Observable<HolidayResponse> {
    return this.http.post<any>(this.apiUrl, inputs);
  }

  // Update an existing holiday
  updateHoliday(holidayId: number,holiday:Holiday): Observable<HolidayResponse> {
    return this.http.put<any>(`${this.apiUrl}/${holidayId}`, holiday);
  }

  // Delete a holiday
  deleteHoliday(holidayId: number): Observable<HolidayResponse> {
    return this.http.delete<any>(`${this.apiUrl}/${holidayId}`);
  }
   // Get a holiday
   getHoliday(holidayId: number): Observable<HolidayResponse> {
    return this.http.get<HolidayResponse>(`${this.apiUrl}/${holidayId}`);
  }
  
}
