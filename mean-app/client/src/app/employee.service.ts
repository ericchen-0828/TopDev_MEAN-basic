import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
