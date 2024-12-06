import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {JwtInterceptor} from '../helpers/jwt.interceptor';
import {ErrorInterceptor} from '../helpers/error.interceptor';
import {AuthGuard} from '../helpers/auth.guard';
import { MatDialog,MAT_DIALOG_DEFAULT_OPTIONS,MatDialogModule,MatDialogRef  } from '@angular/material/dialog';
import { AdminComponent } from './admin/admin.component';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { MatCommonModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditModalComponent } from './editmodal/editmodal.component';
import {MatInputModule} from '@angular/material/input';
import { EditaruserComponent } from './editaruser/editaruser.component';
import { ConfirmationDialogComponent } from './confirmacion/confirmacion.component';
import { TicketComponent } from './ticket/ticket.component';
import { DeclararincidenciaComponent } from './declararincidencia/declararincidencia.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/collections';
import {MatListModule} from '@angular/material/list';
import {CDK_ACCORDION, CdkAccordionModule} from '@angular/cdk/accordion';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import {MatCardModule } from '@angular/material/card'
import {MatTableModule} from '@angular/material/table'
import {MatChipsModule } from '@angular/material/chips'
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegisterComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AddEmpresaComponent,
    ListaEmpresasComponent,
    EditModalComponent,
    EditaruserComponent,
    ConfirmationDialogComponent,
    TicketComponent,
    DeclararincidenciaComponent,
    ConfirmDialogComponent,
   
  ],
  imports: [
    MatInputModule,
    BrowserAnimationsModule,
    MatCommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    CdkTableModule,
    MatListModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatButtonModule,
MatIconModule,
MatCardModule,
MatTableModule,
MatChipsModule,
MatSortModule,
MatOptionModule,
MatSelectModule,
MatMenuModule,
  ],
  providers: [
    provideClientHydration() ,
    {provide: MatDialogRef ,useValue:{}}, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    provideAnimationsAsync()
    
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
