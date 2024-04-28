import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editaruser',
  templateUrl: './editaruser.component.html',
  styleUrl: './editaruser.component.css'
})
export class EditaruserComponent {
  roles: any[] = [];
  empresa: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditaruserComponent>,
    private authService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.roles=data.roles,this.empresa=data.empresa}
  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
