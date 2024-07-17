import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ListaEmpresasComponent } from './lista-empresas.component';

describe('ListaEmpresasComponent', () => {
  let component: ListaEmpresasComponent;
  let fixture: ComponentFixture<ListaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
