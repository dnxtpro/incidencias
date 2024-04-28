import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'confirmacion.component',
  templateUrl: './confirmacion.component.html',
  styleUrl:'./confirmacion.component.css',
})
export class ConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }
}

