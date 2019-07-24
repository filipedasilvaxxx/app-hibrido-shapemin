import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribulusListPage } from './tribulus-list.page';

describe('TribulusListPage', () => {
  let component: TribulusListPage;
  let fixture: ComponentFixture<TribulusListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribulusListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribulusListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
