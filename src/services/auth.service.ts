// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { LoginResponse } from '../app/login-response';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4001/auth'; // Reemplaza con tu URL de autenticación
  private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router,private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
}
public get userValue() {
  return this.userSubject.value;
}
  login(username: string, password: string): Observable<any> {
    this.isAuthenticatedSubject.next(true);
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    
    return this.http.post(`${this.apiUrl}/login`, body, { headers })
    .pipe(map(user=>{
      localStorage.setItem('user',JSON.stringify(user));
      this.userSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return user;
    }));
    
  }
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-user`);
  }
  borrarUser(id: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete-user/${id}`);
  }
  editarUsuario(user:any):Observable<any>{
    console.log('me habeis llamado',user)
    return this.http.put(`${this.apiUrl}/edit-usuario`, user);
  }
  logout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['']);
}
isAuthenticated(): boolean {
  return this.isAuthenticatedSubject.value;
}
}
