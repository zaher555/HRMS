import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  private apiUrl = 'http://127.0.0.1:8000/api/general-settings';

  constructor(private http: HttpClient) {}

  getGeneralSettings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getGeneralSetting(Id:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }
  newGeneralSettings(addons1: any, discount1: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { add_ons: addons1, discount: discount1}, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  updateGeneralSettings(addons1: any, discount1: any,generalId:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${generalId}`, { add_ons: addons1, discount: discount1}, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
