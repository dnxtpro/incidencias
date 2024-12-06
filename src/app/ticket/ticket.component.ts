import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { first } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{
title: string | undefined;
description: string| undefined;
loginForm!: FormGroup;
loading = false;
submitted = false;
error = '';


constructor( public dialogRef: MatDialogRef<TicketComponent>,private formBuilder: FormBuilder,private userService:UserService,private router: Router)
  {}

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
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
  this.userService.ticket(this.f['title'].value, this.f['description'].value)
    .pipe(first())
    .subscribe({
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
    this.dialogRef.close();
}
onClick(): void {
  
  
}
}
