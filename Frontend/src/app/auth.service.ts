import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  token: any;

  constructor(private http: HttpClient, public router: Router) {
    this.token = '';
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any)=>{
        this.router.navigateByUrl('/home');
        alert("Usuario registrado correctamente");
      })
    ).subscribe();

  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.token = token;
        localStorage.setItem('token', this.token);
        this.router.navigateByUrl('/home');
        alert("Has iniciado sesion correctamente");
      })
    ).subscribe();
  }


  logout(token: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions).pipe(
      tap((response: any) => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/home');
        alert("La sesión se ha cerrado");
      })
    ).subscribe();
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
