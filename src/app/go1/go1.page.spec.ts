import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Go1Page } from './go1.page';

describe('Go1Page', () => {
  let component: Go1Page;
  let fixture: ComponentFixture<Go1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Go1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Go1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
