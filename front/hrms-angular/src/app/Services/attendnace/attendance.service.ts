import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  department: {
    id: number;
    department_name: string;
  };
}
export interface monthlyReport{
  // "id": number;
  "employee_name": string,
  "department_name": string,
  "basic_salary": string,
  "total_attendance_days": number,
  "total_departure_days": number,
  "additional_hours": string,
  "discount_hours": string,
  "total_addition": string,
  "total_discount": string,
  "net_salary": string,
  // employee: Employee;
}
export interface AttendanceResponse{
  id: number;
  employee_id: number;
  weekend_id: number;
  holiday_id: number;
  status: string;
  check_in: string;
  check_out: string;
  date: Date | undefined;
  hours: any;
  created_at: string;
  updated_at: string;
  bonus_value:number;
  deduction_value:number;
  employee: Employee; 

}
export interface attendanceResponseType{
  status:number;
  attendance: AttendanceResponse[];
}
export interface reportResponseType{
  status:number;
  report: monthlyReport[];
}
export interface attendanceEditResponse{
  status:number;
  attendance: AttendanceResponse;
}
@Injectable({
  providedIn: 'root'
})

export class AttendanceService {
  constructor(private httpClient:HttpClient) { }
  getList(){
    return this.httpClient.get<attendanceResponseType>(`http://127.0.0.1:8000/api/attendance`);

  }
  getAttendance(attendanceId:number){
    return this.httpClient.get<attendanceEditResponse>(`http://127.0.0.1:8000/api/attendance/${attendanceId}`);

  }
  updateAttendance(attendanceId:number,data:any){
    return this.httpClient.put(`http://127.0.0.1:8000/api/attendance/${attendanceId}`,data);
  }
  getEmployees(){
    return this.httpClient.get<Employee[]>(`http://127.0.0.1:8000/api/employees`);
  }
  submitAttendance(inputs:any){
   return this.httpClient.post(`http://127.0.0.1:8000/api/attendance`,inputs);
  }
  delattendance(attendanceId: number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/attendance/${attendanceId}`);
  }
  getMonthlyReport(){
    return this.httpClient.get<reportResponseType>('http://127.0.0.1:8000/api/reports');
  }
  getReportByMonth(month?:any, year?:any){
    return this.httpClient.get<any[]>(`http://127.0.0.1:8000/api/reports/${month}/${year}`);
  }
  searchAttendanceByname(empName:string,from:any,to:any)
  {
    return this.httpClient.get(`http://127.0.0.1:8000/api/attendance/searchByname/${empName}/${from}/${to}`);
  }
}
