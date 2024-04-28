import { Component,Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModalComponent } from '../editmodal/editmodal.component';
import { EditaruserComponent } from '../editaruser/editaruser.component';
import { RegisterComponent } from '../register/register.component';
import { ConfirmationDialogComponent } from '../confirmacion/confirmacion.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  
  user: any = {};
  roles: any[] = [];
  empresa: any[]=[];

  constructor(private authService: AuthService,private empresaService:EmpresaService,public dialog:MatDialog) {}
  ngOnInit() {

    this.authService.getUser().subscribe(
      (response) => {
        console.log(response)
        this.user = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
    this.authService.getRoles().subscribe(
      (response) => {
        console.log(response)
        this.roles = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
    this.empresaService.getNombreEmpresa().subscribe(
      (response) => {
        console.log(response,'empresa')
        this.empresa = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
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
    this.authService.borrarUser(objeto.id).subscribe(response=>{
  console.log(response)
    },error=>{
      console.log(error)
    })
    this.authService.getUser().subscribe(
      (response) => {
        console.log(response)
        this.user = response; // Asume que el backend devuelve un array de roles
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
  }
  });
  }
  openModal(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '30%',
      enterAnimationDuration:200,
      backdropClass: "bdrop",
      data: { roles:this.roles,empresa:this.empresa, }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      setTimeout(() => {
        // Código a ejecutar después del delay
      console.log('cositasss')
      this.authService.getUser().subscribe(
        (response) => {
          console.log(response)
          this.user = response; // Asume que el backend devuelve un array de roles
        },
        (error) => {
          console.error('Error fetching roles', error);
        }
      );
    }, 100);
    });
    };
    
  editarObjeto(objeto: any) {
    // Aquí puedes implementar la lógica para editar el objeto en el backend
    const dialogRef = this.dialog.open(EditaruserComponent, {
      width: '30%',
      enterAnimationDuration:200,
      backdropClass: "bdrop",
      data: { objeto: objeto,roles:this.roles,empresa:this.empresa, }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.authService.editarUsuario([result]).subscribe(response => {
        console.log('Respuesta del backend:', response);
      }, error => {
        console.error('Error al enviar los datos al backend:', error);
      });
      this.authService.getUser().subscribe(
        (response) => {
          console.log(response)
          this.user = response; // Asume que el backend devuelve un array de roles
        },
        (error) => {
          console.error('Error fetching roles', error);
        }
      );
      
    });
  }

}

