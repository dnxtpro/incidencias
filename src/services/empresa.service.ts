// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject,Observable } from 'rxjs';
import { LoginResponse } from '../app/login-response';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Empresa } from '../models/empresas';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:4001/auth';
  private apiUrl2 = 'http://localhost:4001';
  constructor(private router: Router,private http: HttpClient) { }

  addEmpresa(Empresa:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/add-empresas`, Empresa);
  }
  getEmpresas():Observable<any>{
    return this.http.get(`${this.apiUrl}/getEmpresas`);
  }
  getNombreEmpresa():Observable<any>{
    return this.http.get(`${this.apiUrl}/nombre-empresa`);
  }
  editarEmpresa(Empresa:any[]):Observable<any>{
    console.log('me habeis llamado',Empresa)
    return this.http.put(`${this.apiUrl}/edit-empresas`, Empresa);
  }
  borrarEmpresa(id: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/delete-empresas/${id}`);
  }
  editarEstado(id:number,nuevoEstado:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/edit-ticket/${id}`,{estado:nuevoEstado})
  }
}