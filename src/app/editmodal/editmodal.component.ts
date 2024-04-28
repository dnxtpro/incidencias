import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'edit-modal',
  templateUrl: 'editmodal.component.html',
})
export class EditModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    private EmpresaService:EmpresaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  }
 