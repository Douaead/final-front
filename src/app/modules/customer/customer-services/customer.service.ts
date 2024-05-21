import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-services/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

 
  postCategory(categoryDto: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + "api/customer/category", categoryDto);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any[]>(BASIC_URL + "api/customer/categories", {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set("Authorization", "Bearer " + StorageService.getToken());
  }

  getAllCategoriesByTitle(title: string): Observable<any> {
    return this.http.get<any[]>(BASIC_URL + `api/customer/categories/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }
 
}
