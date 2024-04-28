import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.css'
})
export class AddEmpresaComponent {
  Empresa:any={}
  constructor(private EmpresaService:EmpresaService,public dialogRef:DialogRef){}

  onSubmit(){
    this.EmpresaService.addEmpresa(this.Empresa).subscribe(
      (response) => {
        console.log('Empresa registered successfully', response);
        // Puedes manejar la respuesta aquí, redirigir a otra página, etc.
      },
      (error) => {
        console.error('Error registering empresa', error);
        // Puedes manejar el error aquí, mostrar un mensaje al usuario, etc.
      }
    );
    this.dialogRef.close();
  }
}