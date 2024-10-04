import { department } from './../emloyee/employee.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface adminResponse{
  id:number;
  fullname:string;
  group_id:number;
  email:string;
  username:string; 
  groups:group;
}
export interface adminResponseType{
  status:number,
  user:adminResponse[];
}
export interface adminEditResponse{
  status:number,
  user:adminResponse;
}
export interface group{

id:number,
name:string,
privileges_id:number;
privileges: {
id:number ,
name:string,
description:string
  }

}
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getGroup(){
    return this.httpClient.get<group[]>(`http://127.0.0.1:8000/api/group`)
  }

  constructor(private httpClient: HttpClient) { }
  setAdmin(inputs:any){
    return this.httpClient.post(`http://127.0.0.1:8000/api/users`,inputs);
  
  }
  getAdmins(){
    return this.httpClient.get<adminResponseType>(`http://127.0.0.1:8000/api/users`);
  }
  getAdmin(adminId:number){
    return this.httpClient.get<adminEditResponse>(`http://127.0.0.1:8000/api/users/${adminId}`);

  }
  updateAdmin(adminId:number,data:any){
    return this.httpClient.put(`http://127.0.0.1:8000/api/users/${adminId}`,data);
  }
 
  deleteAdmin(adminId:number){
    return this.httpClient.delete(`http://127.0.0.1:8000/api/users/${adminId}`);

  }
}
