import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab5RegisterPage } from './tab5-register.page';

describe('Tab5RegisterPage', () => {
  let component: Tab5RegisterPage;
  let fixture: ComponentFixture<Tab5RegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab5RegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab5RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
