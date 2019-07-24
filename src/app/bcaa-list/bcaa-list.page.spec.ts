import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcaaListPage } from './bcaa-list.page';

describe('BcaaListPage', () => {
  let component: BcaaListPage;
  let fixture: ComponentFixture<BcaaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcaaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcaaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
