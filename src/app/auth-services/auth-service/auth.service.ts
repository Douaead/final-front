import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const Basic_URL=["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

signup(signuprequest:any):Observable<any>{
  return this.http.post<[]>(Basic_URL + "api/auth/signup", signuprequest);

}
login(loginRequest:any):Observable<any>{
  return this.http.post<[]>(Basic_URL + "api/auth/login", loginRequest);
}
}