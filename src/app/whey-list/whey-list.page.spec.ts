import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheyListPage } from './whey-list.page';

describe('WheyListPage', () => {
  let component: WheyListPage;
  let fixture: ComponentFixture<WheyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheyListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
