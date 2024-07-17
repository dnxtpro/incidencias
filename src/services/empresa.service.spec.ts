import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EmpresaService } from './empresa.service';

describe('EmpresaService', () => {
  let service: EmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
