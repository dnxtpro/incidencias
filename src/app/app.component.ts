import { Component, OnInit, ElementRef, ViewChild,AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import {Role } from '../models/roles';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Cosas } from '../models/cosas';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  loading = false;
  users: User[] = []; // Initialize us
  isSidebarOpen: boolean = false;
  isAuthenticated: boolean = false;
  isOpenModal = true;
  title = 'incidencias';
  @ViewChild('sidebar') sidebar!: ElementRef;
  constructor(private AuthService:AuthService,private userService:UserService,private router: Router,private dialog: MatDialog)
  {
  
  
 }
 ngOnInit(){
  
  this.loading = false;
  this.userService.getAll().pipe(first()).subscribe(userObject => {
      console.log(userObject);
      this.loading = false;
      // Convert object to array
      this.users = Object.entries(userObject).map(([key, value]) => value);
  });
 }
 ngAfterViewInit() {
  this.AuthService.isAuthenticated$.subscribe(isAuthenticated => {
    this.isAuthenticated = isAuthenticated;
    if (this.isAuthenticated) {
      console.log('Usuario autenticado');
    } else {
      console.log('Usuario no autenticado');
    }
  });
}
 toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

  logout(){
    this.AuthService.logout();
  }
  openModal() {
    
    this.isOpenModal = true;
     // Set flag to true when button clicked
  }
  navigate(){
    this.router.navigate(['/login'])
  }
  openPlayerModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      enterAnimationDuration:200,
      backdropClass: "bdrop",
      
    });
}

}