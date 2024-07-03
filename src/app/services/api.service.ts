import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // URL de tu json-server

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, user);
  }

  getUser(nombre: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios?nombre=${nombre}&password=${password}`);
  }
}