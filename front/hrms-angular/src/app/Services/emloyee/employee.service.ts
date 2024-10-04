import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { attendanceEditResponse, attendanceResponseType } from '../attendnace/attendance.service';
export interface employeeResponse{
  id:number;
  name:String;
  phone:string;
  salary:string;
  hire_date:Date | undefined;
  ssn:string;
  address:string;
  department_id:number;
  department:department;
  gender: any;
  doa:Date | undefined;
  check_in:string;
  check_out:string;
  }
  export interface department{
    id: number;
    department_name: string;
  }
  export interface employeeResponseType{
    status:number;
    employee:employeeResponse[];
  }
  export interface employeeEditResponse{
    status:number;
    employee:employeeResponse;
  }
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  
  constructor(private httpClient:HttpClient) { }
  getdepartments(){
    return this.httpClient.get(`http://127.0.0.1:8000/api/department`);
  }
  setEmployees(inputs:any){
    return this.httpClient.post(`http://127.0.0.1:8000/api/employees`,inputs,{headers:{'Content-Type':'application/json'}});
  }
  getEmployees(){
    return this.httpClient.get<employeeResponseType>(`http://127.0.0.1:8000/api/employees`);
  }
  getEmployee(employeeId:number){
    return this.httpClient.get<employeeEditResponse>(`http://127.0.0.1:8000/api/employees/${employeeId}`);
  }
  updateEmployee(employeeId:number,data:any){
    return this.httpClient.put(`http://127.0.0.1:8000/api/employees/${employeeId}`,data);
  }
 
  deleteEmployee(employeeId: number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/employees/${employeeId}`);
  }
  
}
