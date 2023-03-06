import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;
  user = {};
  errorMessage: string = '';
  res : any;

  constructor(private authService: AuthService) {
    this.email = '';
    this.password = '';
  }

  async onSubmit() {
    if(this.email == "" || this.password == ""){
      this.errorMessage = "Revisa que todos los campos estén rellenados"
      return;
    }
    this.user = { email: this.email, password: this.password };
    this.res = await this.authService.login(this.user);
  }
}
