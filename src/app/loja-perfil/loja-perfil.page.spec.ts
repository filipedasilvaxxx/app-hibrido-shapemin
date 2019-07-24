import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaPerfilPage } from './loja-perfil.page';

describe('LojaPerfilPage', () => {
  let component: LojaPerfilPage;
  let fixture: ComponentFixture<LojaPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaPerfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
