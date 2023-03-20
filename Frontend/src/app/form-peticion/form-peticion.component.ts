import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../peticiones.service';

@Component({
  selector: 'app-form-peticion',
  templateUrl: './form-peticion.component.html',
  styleUrls: ['./form-peticion.component.css'],
})
export class FormPeticionComponent {
  titulo: string;
  descripcion: string;
  destinatario: string;
  category: number;
  errorMessage: string = "";

  constructor(
    private peticionesService: PeticionesService,
    private router: Router
  ) {
    this.category = 0;
    this.descripcion = '';
    this.destinatario = '';
    this.titulo = '';
  }

  enviarFormulario() {
    if (this.titulo == "" || this.descripcion == "" || this.destinatario == "" || this.category == 0) {
      this.errorMessage = "Revisa que todos los campos estén rellenados"
    }
    this.peticionesService
      .enviarFormulario(
        this.titulo,
        this.descripcion,
        this.destinatario,
        this.category
      )
      .subscribe(
        (response) => this.router.navigateByUrl('peticiones'),
        (error) => {
          console.log(error)
          this.errorMessage = error
        }
      );
  }
}
