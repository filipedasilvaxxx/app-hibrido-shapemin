import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SujestaoPage } from './sujestao.page';

describe('SujestaoPage', () => {
  let component: SujestaoPage;
  let fixture: ComponentFixture<SujestaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SujestaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SujestaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
