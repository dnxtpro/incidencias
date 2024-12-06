import { Component,Inject, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresas';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModalComponent } from '../editmodal/editmodal.component';
import { AddEmpresaComponent } from '../add-empresa/add-empresa.component';
import { ConfirmationDialogComponent } from '../confirmacion/confirmacion.component';

interface empresa{
  id:number;
  nombre:string;
  ciudad:string;
  sector:string;
  responsable:string;

}

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.css'
})
export class ListaEmpresasComponent implements OnInit{
  Empresa: empresa[]=[];
  constructor(private EmpresaService:EmpresaService,public dialog:MatDialog){}

ngOnInit(){
  this.EmpresaService.getEmpresas().subscribe(
    (response:empresa[]) => {
      console.log(response)
      this.Empresa = response; 
    },
    (error) => {
      console.error('Error fetching empresas', error);
    }
  );
}


borrarObjeto(objeto:any){
  console.log(objeto.id)
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '30%',
    enterAnimationDuration:200,
    backdropClass: "bdrop",
    data: { objeto: objeto }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.EmpresaService.borrarEmpresa(objeto.id).subscribe(response=>{
      console.log(response)
      },error=>{
      console.log(error)
      })
  this.EmpresaService.getEmpresas().subscribe(
    (response) => {
      console.log(response)
      this.Empresa = response; 
    },
    (error) => {
      console.error('Error fetching empresas', error);
    }
  );
}
});
}
editarObjeto(objeto: any) {
  // Aquí puedes implementar la lógica para editar el objeto en el backend
  const dialogRef = this.dialog.open(EditModalComponent, {
    width: '30%',
    enterAnimationDuration:200,
    backdropClass: "bdrop",
    data: { objeto: objeto }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    this.EmpresaService.editarEmpresa([result]).subscribe(response => {
      console.log('Respuesta del backend:', response);
    }, error => {
      console.error('Error al enviar los datos al backend:', error);
    });
    this.EmpresaService.getEmpresas().subscribe(
      (response) => {
        console.log(response)
        this.Empresa = response; 
      },
      (error) => {
        console.error('Error fetching empresas', error);
      }
    );
    
  });
}
abrirModal(): void {
  const dialogRef = this.dialog.open(AddEmpresaComponent, {
    width: '30%',
    enterAnimationDuration:200,
    backdropClass: "bdrop",
    data: {} // Puedes pasar cualquier dato necesario al componente 'add-empresa'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    this.EmpresaService.getEmpresas().subscribe(
      (response) => {
        console.log(response)
        this.Empresa = response; 
      },
      (error) => {
        console.error('Error fetching empresas', error);
      }
    );
  });
}
}


