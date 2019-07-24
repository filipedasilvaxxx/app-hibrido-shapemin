import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeLojaPage } from './cadastro-de-loja.page';

describe('CadastroDeLojaPage', () => {
  let component: CadastroDeLojaPage;
  let fixture: ComponentFixture<CadastroDeLojaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeLojaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeLojaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
