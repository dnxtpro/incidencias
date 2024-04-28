import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from '../../helpers/auth.guard';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[] = []; // Initialize users as an array

    constructor(private userService: UserService,private dialog:MatDialog,authguard:AuthGuard) { }

    ngOnInit() {
        
        this.openPlayerModal();
        this.loading = false;
        this.userService.getAll().pipe(first()).subscribe(userObject => {
            console.log(userObject);
            this.loading = false;
            // Convert object to array
            this.users = Object.entries(userObject).map(([key, value]) => value);
        });
    }
    openPlayerModal(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '30%',
          enterAnimationDuration:200,
          backdropClass: "bdrop",
          disableClose: true
        });
    }
}
