import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietPage } from './chitiet.page';

describe('ChitietPage', () => {
  let component: ChitietPage;
  let fixture: ComponentFixture<ChitietPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
