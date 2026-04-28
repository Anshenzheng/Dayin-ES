import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}`
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { username, password });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${API_URL}/auth/me`, { headers: this.getAuthHeaders() });
  }

  getPublic(endpoint: string): Observable<any> {
    return this.http.get(`${API_URL}/public${endpoint}`);
  }

  postPublic(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${API_URL}/public${endpoint}`, data);
  }

  getAdmin(endpoint: string): Observable<any> {
    return this.http.get(`${API_URL}/admin${endpoint}`, { headers: this.getAuthHeaders() });
  }

  postAdmin(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${API_URL}/admin${endpoint}`, data, { headers: this.getAuthHeaders() });
  }

  putAdmin(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${API_URL}/admin${endpoint}`, data, { headers: this.getAuthHeaders() });
  }

  deleteAdmin(endpoint: string): Observable<any> {
    return this.http.delete(`${API_URL}/admin${endpoint}`, { headers: this.getAuthHeaders() });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
    return this.http.post(`${API_URL}/admin/upload`, formData, { headers });
  }
}
