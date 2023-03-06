import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PeticionesService } from '../peticiones.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css'],
})
export class PeticionesComponent {
  peticiones: any;
  constructor(private peticionService: PeticionesService, private authService : AuthService, private router: Router) {}

  ngOnInit() {
    this.peticionService
      .index()
      .subscribe((peticiones) => (this.peticiones = peticiones));
  }

  newPeticion(){
     this.router.navigate(['/create']);
  }

}
