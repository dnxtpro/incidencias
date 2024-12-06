import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { TicketComponent } from '../ticket/ticket.component';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from '../../services/empresa.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


export interface Cerdo{
  id:number,
  title:string,
  description:string,
  creationtime:string,
  state:string,
  user:number,


}

@Component({
  selector: 'app-declararincidencia',
  templateUrl: './declararincidencia.component.html',
  styleUrl: './declararincidencia.component.css'
})

export class DeclararincidenciaComponent implements OnInit {
  ticket:Cerdo[]=[];
  tickets: any[] = []; 
  constructor(private UserService: UserService,public dialog:MatDialog,private empresaService:EmpresaService){}
ngOnInit(): void {
  this.getTicket();
}

abrirModal(): void {
  const dialogRef = this.dialog.open(TicketComponent, {
    width: '30%',
    enterAnimationDuration:200,
    backdropClass: "bdrop",
    data: {} // Puedes pasar cualquier dato necesario al componente 'add-empresa'
  });

  dialogRef.afterClosed()
}
cambiarEstado(ticketId: number, nuevoEstado: string) {
  console.log(ticketId,nuevoEstado)
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: '¿Estás seguro de que deseas cambiar el estado?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    const id = ticketId
    if (result === 'confirm') {
      this.empresaService.editarEstado(id, nuevoEstado).subscribe(
        () => {
          // Actualiza el estado en la interfaz de usuario si es necesario
          const ticket = this.tickets.find(t => t.id === id);
          if (ticket) {
            ticket.state = nuevoEstado;
          }
          alert('Estado actualizado con éxito');
        },
        (error) => {
          console.error('Error al actualizar el estado', error);
          alert('Error al actualizar el estado');
        }
      );
    }
  });
}

  getTicket(){
    this.UserService.getTickets().subscribe(
      (response: Cerdo[]) => {
        console.log(response)
        this.ticket = response; 
        console.log(this.ticket)
      },
      (error) => {
        console.error('Error fetching empresas', error);
      }
    );
  }
}
