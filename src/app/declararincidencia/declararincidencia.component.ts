import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { TicketComponent } from '../ticket/ticket.component';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-declararincidencia',
  templateUrl: './declararincidencia.component.html',
  styleUrl: './declararincidencia.component.css'
})

export class DeclararincidenciaComponent implements OnInit {
  ticket:any={};
  constructor(private UserService: UserService,public dialog:MatDialog){}
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

  getTicket(){
    this.UserService.getTickets().subscribe(
      (response) => {
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
