import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../helpers/auth.guard';
import { AdminGuard } from '../helpers/admin.guard';
import { Role } from '../models/roles';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { TopAdminGuard } from '../helpers/topadmin.guard';
import { DeclararincidenciaComponent } from './declararincidencia/declararincidencia.component';
import { TicketComponent } from './ticket/ticket.component';
const routes: Routes = [
  { path: '', redirectTo: 'userlist', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path:'ticket', component: TicketComponent},
{path:'incidencia',component:DeclararincidenciaComponent},
  {path:'userlist', component: UserListComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'lista-empresas',component:ListaEmpresasComponent,canActivate:[AuthGuard,TopAdminGuard,AdminGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
