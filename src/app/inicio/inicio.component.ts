// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Manejar la respuesta del servidor, mostrar el mensaje correspondiente.
        this.message = `Bienvenido ${response.role === 'superadmin' ? 'Superadmin' : response.role === 'admin' ? 'Admin' : 'Usuario'} ${response.username}!`;
      },
      (error) => {
        this.message = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
  onButtonClick(): void {
    this.router.navigate(['/mondongo']);
  }
}
