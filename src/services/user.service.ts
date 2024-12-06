import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { User } from '../models/user';
import { Cosas } from '../models/cosas';

export interface Cerdo{
    id:number,
    title:string,
    description:string,
    creationtime:string,
    state:string,
    user:number,
  
  
  }

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = 'http://localhost:4001/auth';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/mainUser`);
    }
    getAll1():Observable<any>  {
        return this.http.get<Cosas[]>(`${this.apiUrl}/mainUser`);
    }
    ticket(title:string,description:string): Observable<any>{
        console.log(title,description,'tontito')
        const body = { title,description };
        return this.http.post(`${this.apiUrl}/post-ticket`, body);
    }
    getTickets(){
        return this.http.get<Cerdo[]>(`${this.apiUrl}/getTickets`)
    }
}