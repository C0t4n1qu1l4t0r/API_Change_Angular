import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PeticionesComponent } from './peticiones/peticiones.component';
import { AuthGuard } from './auth.guard';
import { FormPeticionComponent } from './form-peticion/form-peticion.component';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'peticiones',
    component: PeticionesComponent,
  },
  {
    path: 'create',
    component: FormPeticionComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
