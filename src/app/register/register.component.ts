// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage: string = '';
  showErrorMessage: boolean = false;
  user: any = {};
  roles: any[] = [];
  empresa: any[]=[];

  constructor(private authService: AuthService, private empresaService:EmpresaService,public dialogRef:DialogRef,private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.authService.getRoles().subscribe(
      (response) => {
        console.log(response,'los roles')
        this.roles = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
    this.empresaService.getNombreEmpresa().subscribe(
      (response) => {
        console.log(response,'empresa')
        this.empresa = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
  }
  onSubmit() {
    console.log(this.user);
    this.authService.addUser(this.user).pipe(
      tap((response) => {
        console.log('User registered successfully', response);
        // Puedes manejar la respuesta aquí, redirigir a otra página, etc.
        this.dialogRef.close();
      }),
      catchError((error) => {
        console.error('Error registering user', error);
        this.errorMessage = error;
        console.log(error);
        this.cdr.detectChanges();
        this.showErrorMessage = true; 
        return of(null); // Devuelve un observable vacío para continuar con el flujo
      }),
      finalize(() => {
        // Cualquier limpieza o acción final aquí
      })
    ).subscribe();
  }
}