import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongbaoPage } from './thongbao.page';

describe('ThongbaoPage', () => {
  let component: ThongbaoPage;
  let fixture: ComponentFixture<ThongbaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongbaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongbaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
