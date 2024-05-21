// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private SERVER_URL = "http://localhost:8080/api/customer/";

  constructor(private http: HttpClient) { }

  approveCategory(categoryId: number): Observable<any> {
    const url = `${this.SERVER_URL}categories/${categoryId}/approve`;
    return this.http.put(url, {});
  }

  getApprovedCategory(categoryId: number): Observable<Category> {
    const url = `${this.SERVER_URL}categories/${categoryId}/approved`;
    return this.http.get<Category>(url);
  }

  sendCategory(categoryId: number): Observable<Category> {
    const url = `${this.SERVER_URL}categories/${categoryId}/send`;
    return this.http.post<Category>(url, null);
  }
  
}
