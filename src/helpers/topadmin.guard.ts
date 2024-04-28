import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Cosas } from '../models/cosas';
import { Observable } from 'rxjs';
import { __values } from 'tslib';
import { exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TopAdminGuard implements CanActivate {
  user: Cosas = {} as Cosas;
    constructor(
        private router: Router,
        private authService: AuthService,
        private userService: UserService,   
    ) { }

    canActivate(): Observable<boolean> {
      return this.userService.getAll1().pipe(
        exhaustMap(user => {
          if (user.rolename === 'ADMIN') {
            if(user.empresa===-1){
              console.log(user.empresa)
              return of(true);
            }
           else{return of(false);}
            
          } else {
            this.router.navigate(['/home']);
            return of(false);
          }
        })
      );
    }
  }