import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatineListPage } from './creatine-list.page';

describe('CreatineListPage', () => {
  let component: CreatineListPage;
  let fixture: ComponentFixture<CreatineListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatineListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatineListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
