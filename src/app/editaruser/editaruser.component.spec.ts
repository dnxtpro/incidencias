import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EditaruserComponent } from './editaruser.component';

describe('EditaruserComponent', () => {
  let component: EditaruserComponent;
  let fixture: ComponentFixture<EditaruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditaruserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
