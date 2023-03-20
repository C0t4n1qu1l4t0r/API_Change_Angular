import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class PeticionesService {
  private apiUrl = 'http://localhost:8000/api/peticiones';

  token: any;
  constructor(private http: HttpClient, public router: Router) {
    this.token = '';
  }

  index() {
    return this.http.get<any[]>(this.apiUrl + '/listado');
  }

  enviarFormulario(
    titulo: string,
    descripcion: string,
    destinatario: string,
    category: number
  ) {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8000/api/peticiones/store';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    const body = {
      titulo,
      descripcion,
      destinatario,
      category,
    };

    console.log(body);
    alert('Peticion almacenada correctamente');
    return this.http.post<any>(url, body, httpOptions);
  }
}
