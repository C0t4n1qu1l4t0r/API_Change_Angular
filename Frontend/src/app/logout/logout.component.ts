import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  res: any;
  constructor(private authService: AuthService, private router: Router) {}

  async logout() {
    var token = localStorage.getItem('token');
    this.res = await this.authService.logout(token);
  }

  isAuthenticated() {
    this.authService.isAuthenticated();
  }
}
