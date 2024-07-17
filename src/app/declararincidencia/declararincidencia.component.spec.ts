import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclararincidenciaComponent } from './declararincidencia.component';

describe('DeclararincidenciaComponent', () => {
  let component: DeclararincidenciaComponent;
  let fixture: ComponentFixture<DeclararincidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclararincidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclararincidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
