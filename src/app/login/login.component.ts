import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';


import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
  
})
export class LoginComponent implements OnInit{
  isAuthenticated: boolean = false;
  loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';


  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,) { if (this.authService.userValue) { 
      this.router.navigate(['/']);
  }}
  onClose(): void {
    this.dialogRef.close();
  }
  onClick(): void {
  
}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
}

get f() { return this.loginForm.controls; }
onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
    return;
  }

  this.error = '';
  this.loading = true;
  this.authService.login(this.f['username'].value, this.f['password'].value)
    .pipe(first())
    .subscribe({
      next: () => {
        // El inicio de sesión fue exitoso, cierra la modal
        this.dialogRef.close();
        
        // Obtén la URL de retorno de los parámetros de la ruta o usa una URL predeterminada
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
}
}