import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name!: string;
  email!: string;
  password!: string;
  user = {};
  res : any;

  constructor(private authService: AuthService) {
  }

  async onSubmit() {
    this.user = {
      email: this.email,
      password: this.password,
      name: this.name,
    };
    this.res = await this.authService.register(this.user);
  }
}
