import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMorePage } from './select-more.page';

describe('SelectMorePage', () => {
  let component: SelectMorePage;
  let fixture: ComponentFixture<SelectMorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
